import Link from "next/link";
import { ContactRequestActions } from "@/components/dashboard/contact-request-actions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import {
  contactStatusLabels,
  contactStatusVariants,
  type ContactRequestListItem,
} from "@/lib/contact-requests";

type ContactRequestListProps = {
  requests: ContactRequestListItem[];
  variant: "buyer" | "seller" | "manager";
  emptyTitle: string;
  emptyDescription: string;
  showActions?: boolean;
};

export function ContactRequestList({
  requests,
  variant,
  emptyTitle,
  emptyDescription,
  showActions = variant === "seller",
}: ContactRequestListProps) {
  if (requests.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
        <p className="text-base font-medium text-foreground">{emptyTitle}</p>
        <p className="mt-2 text-sm text-muted">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-4">
      {requests.map((request) => (
        <Card key={request.id} className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              {request.assetId && request.assetTitle ? (
                <Link
                  href={`/assets/${request.assetId}`}
                  className="text-base font-semibold tracking-tight break-words text-foreground transition-colors hover:text-primary"
                >
                  {request.assetTitle}
                </Link>
              ) : (
                <p className="text-base font-semibold tracking-tight break-words text-foreground">
                  {request.assetTitle ??
                    (variant === "buyer"
                      ? (request.sellerCompany ?? request.sellerEmail)
                      : (request.buyerCompany ?? request.buyerEmail))}
                </p>
              )}
              <p className="mt-1 text-sm text-muted">
                {formatDate(request.createdAt)}
              </p>
            </div>
            <Badge variant={contactStatusVariants[request.status]}>
              {contactStatusLabels[request.status]}
            </Badge>
          </div>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {variant !== "buyer" ? (
              <div>
                <dt className="text-[11px] font-medium tracking-wide text-muted uppercase">
                  Покупець
                </dt>
                <dd className="mt-1 text-sm font-medium break-words text-foreground">
                  {request.buyerCompany ?? request.buyerEmail}
                </dd>
                {request.buyerCompany ? (
                  <dd className="text-sm break-all text-muted">{request.buyerEmail}</dd>
                ) : null}
              </div>
            ) : null}
            {variant !== "seller" ? (
              <div>
                <dt className="text-[11px] font-medium tracking-wide text-muted uppercase">
                  Продавець
                </dt>
                <dd className="mt-1 text-sm font-medium break-words text-foreground">
                  {request.sellerCompany ?? request.sellerEmail}
                </dd>
                {variant === "manager" && request.sellerCompany ? (
                  <dd className="text-sm break-all text-muted">{request.sellerEmail}</dd>
                ) : null}
              </div>
            ) : null}
          </dl>

          <div className="mt-4">
            <p className="text-[11px] font-medium tracking-wide text-muted uppercase">
              Повідомлення
            </p>
            <p className="mt-1 text-sm leading-6 break-words text-foreground">
              {request.message}
            </p>
          </div>

          {showActions && request.status === "PENDING" ? (
            <div className="mt-4 border-t border-border pt-4">
              <ContactRequestActions requestId={request.id} />
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
