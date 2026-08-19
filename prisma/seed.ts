import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('Demo12345!', 10);

  await prisma.contactRequest.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.buyerProfile.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.user.deleteMany();

  const buyer1 = await prisma.user.create({
    data: {
      email: 'buyer@n5deal.demo',
      password,
      role: 'BUYER',
      buyerProfile: {
        create: {
          companyName: 'European Capital Partners',
          description: 'Investment group focused on technology and digital businesses.',
          investmentTypes: ['Majority Acquisition', 'Growth Investment'],
          industries: ['SaaS', 'Fintech', 'Technology'],
          countries: ['Germany', 'Poland', 'Netherlands'],
          minInvestment: 1000000,
          maxInvestment: 5000000,
          acquisitionInterests: 'Looking for established technology businesses with recurring revenue.',
        },
      },
    },
  });

  const buyer2 = await prisma.user.create({
    data: {
      email: 'investor@n5deal.demo',
      password,
      role: 'BUYER',
      buyerProfile: {
        create: {
          companyName: 'Strategic Acquisitions Group',
          description: 'Strategic investor acquiring profitable European companies.',
          investmentTypes: ['Full Acquisition', 'Strategic Investment'],
          industries: ['Manufacturing', 'Logistics', 'Healthcare'],
          countries: ['Poland', 'Czech Republic', 'Germany'],
          minInvestment: 2000000,
          maxInvestment: 10000000,
          acquisitionInterests: 'Interested in profitable companies with strong management teams.',
        },
      },
    },
  });

  const seller1 = await prisma.user.create({
    data: {
      email: 'seller@n5deal.demo',
      password,
      role: 'SELLER',
      sellerProfile: {
        create: {
          companyName: 'Nordic Business Holdings',
          description: 'Private company owner offering selected European businesses.',
          country: 'Germany',
          website: 'https://example.com',
        },
      },
    },
    include: {
      sellerProfile: true,
    },
  });

  const seller2 = await prisma.user.create({
    data: {
      email: 'business@n5deal.demo',
      password,
      role: 'SELLER',
      sellerProfile: {
        create: {
          companyName: 'Central Europe Ventures',
          description: 'Investment and business advisory group.',
          country: 'Poland',
          website: 'https://example.com',
        },
      },
    },
    include: {
      sellerProfile: true,
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@n5deal.demo',
      password,
      role: 'MANAGER',
    },
  });

  const seller1ProfileId = seller1.sellerProfile!.id;
  const seller2ProfileId = seller2.sellerProfile!.id;

  const asset1 = await prisma.asset.create({
    data: {
      sellerId: seller1ProfileId,
      title: 'B2B SaaS Platform',
      description: 'Established B2B SaaS company with recurring revenue and international customers.',
      assetType: 'Business',
      industry: 'SaaS',
      country: 'Germany',
      askingPrice: 2500000,
      revenue: 4200000,
      ebitda: 1100000,
      employees: 32,
      status: 'PUBLISHED',
    },
  });

  const asset2 = await prisma.asset.create({
    data: {
      sellerId: seller1ProfileId,
      title: 'Fintech Payment Platform',
      description: 'Growing fintech platform serving small and medium-sized businesses.',
      assetType: 'Business',
      industry: 'Fintech',
      country: 'Germany',
      askingPrice: 3800000,
      revenue: 5600000,
      ebitda: 900000,
      employees: 45,
      status: 'PUBLISHED',
    },
  });

  const asset3 = await prisma.asset.create({
    data: {
      sellerId: seller1ProfileId,
      title: 'E-commerce Brand',
      description: 'Established European e-commerce brand with strong direct-to-consumer sales.',
      assetType: 'Company',
      industry: 'E-commerce',
      country: 'Netherlands',
      askingPrice: 1800000,
      revenue: 3900000,
      ebitda: 650000,
      employees: 18,
      status: 'PUBLISHED',
    },
  });

  const asset4 = await prisma.asset.create({
    data: {
      sellerId: seller2ProfileId,
      title: 'Logistics Company',
      description: 'Regional logistics operator with long-term B2B contracts.',
      assetType: 'Business',
      industry: 'Logistics',
      country: 'Poland',
      askingPrice: 3200000,
      revenue: 7800000,
      ebitda: 1600000,
      employees: 74,
      status: 'PUBLISHED',
    },
  });

  const asset5 = await prisma.asset.create({
    data: {
      sellerId: seller2ProfileId,
      title: 'Healthcare Services Group',
      description: 'Private healthcare services business with multiple locations.',
      assetType: 'Company',
      industry: 'Healthcare',
      country: 'Poland',
      askingPrice: 4200000,
      revenue: 9100000,
      ebitda: 1900000,
      employees: 96,
      status: 'PUBLISHED',
    },
  });

  const asset6 = await prisma.asset.create({
    data: {
      sellerId: seller2ProfileId,
      title: 'Manufacturing Business',
      description: 'Profitable manufacturing company supplying industrial customers.',
      assetType: 'Business',
      industry: 'Manufacturing',
      country: 'Czech Republic',
      askingPrice: 5200000,
      revenue: 12400000,
      ebitda: 2400000,
      employees: 140,
      status: 'PUBLISHED',
    },
  });

  await prisma.asset.create({
    data: {
      sellerId: seller1ProfileId,
      title: 'Software Development Company',
      description: 'Software engineering company with international clients.',
      assetType: 'Company',
      industry: 'Technology',
      country: 'Ukraine',
      askingPrice: 2100000,
      revenue: 3500000,
      ebitda: 800000,
      employees: 55,
      status: 'DRAFT',
    },
  });

  await prisma.asset.create({
    data: {
      sellerId: seller2ProfileId,
      title: 'Renewable Energy Business',
      description: 'Renewable energy company focused on commercial installations.',
      assetType: 'Business',
      industry: 'Energy',
      country: 'Netherlands',
      askingPrice: 6500000,
      revenue: 11200000,
      ebitda: 2200000,
      employees: 64,
      status: 'PUBLISHED',
    },
  });

  await prisma.asset.create({
    data: {
      sellerId: seller1ProfileId,
      title: 'Food Manufacturing Company',
      description: 'Established food manufacturer with private-label production capabilities.',
      assetType: 'Company',
      industry: 'Food',
      country: 'Czech Republic',
      askingPrice: 2900000,
      revenue: 6700000,
      ebitda: 1200000,
      employees: 82,
      status: 'PUBLISHED',
    },
  });

  await prisma.asset.create({
    data: {
      sellerId: seller2ProfileId,
      title: 'B2B Marketplace',
      description: 'Digital marketplace connecting European suppliers and business buyers.',
      assetType: 'Business',
      industry: 'Technology',
      country: 'Germany',
      askingPrice: 4700000,
      revenue: 6200000,
      ebitda: 1300000,
      employees: 41,
      status: 'PUBLISHED',
    },
  });

  await prisma.contactRequest.create({
    data: {
      senderId: buyer1.id,
      recipientId: seller1.id,
      assetId: asset1.id,
      message: 'We are interested in discussing the acquisition opportunity.',
      status: 'PENDING',
    },
  });

  await prisma.contactRequest.create({
    data: {
      senderId: seller2.id,
      recipientId: buyer2.id,
      assetId: asset4.id,
      message: 'Would you be interested in reviewing this logistics opportunity?',
      status: 'ACCEPTED',
    },
  });

  console.log('Demo data created successfully');
  console.log('Users:', {
    buyers: 2,
    sellers: 2,
    managers: 1,
  });
  console.log('Assets:', 10);
  console.log('Contact requests:', 2);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });