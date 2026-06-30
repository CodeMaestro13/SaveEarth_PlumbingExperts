const fs = require("node:fs");
const path = require("node:path");
const mysql = require("mysql2/promise");

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function requireEnv(key) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `item-${Date.now()}`;
}

const projectImages = {
  plumbing: "/images/india-projects/indian-apartment-plumbing.png",
  terraceWaterproofing: "/images/india-projects/indian-terrace-waterproofing.png",
  bathroomWaterproofing: "/images/india-projects/indian-bathroom-waterproofing.png",
  poolConstruction: "/images/india-projects/indian-pool-construction.png",
  pumpRoom: "/images/india-projects/indian-pump-room-maintenance.png",
  waterFeature: "/images/india-projects/indian-water-feature-installation.png"
};

const services = [
  {
    title: "Terrace Waterproofing",
    description:
      "Membrane, coating, and slope-correction systems that protect exposed terraces from seepage and structural damage.",
    iconKey: "shield",
    image: projectImages.terraceWaterproofing,
    features: ["Surface preparation", "Elastomeric coating", "Flood testing"],
    category: "Waterproofing"
  },
  {
    title: "Roof Waterproofing",
    description:
      "Durable roof waterproofing for residential, commercial, and industrial buildings with long-term performance.",
    iconKey: "building",
    image: projectImages.terraceWaterproofing,
    features: ["Heat reflective options", "Joint treatment", "Warranty support"],
    category: "Waterproofing"
  },
  {
    title: "Basement Waterproofing",
    description:
      "Negative-side and positive-side waterproofing systems for basements, retaining walls, and underground structures.",
    iconKey: "droplets",
    image: projectImages.pumpRoom,
    features: ["Injection grouting", "Drainage planning", "Crack sealing"],
    category: "Waterproofing"
  },
  {
    title: "Bathroom Waterproofing",
    description:
      "Pre-tile waterproofing and wet-area sealing for bathrooms, kitchens, utility areas, and balconies.",
    iconKey: "bath",
    image: projectImages.bathroomWaterproofing,
    features: ["Pipe collar sealing", "Tile-compatible layers", "Leak prevention"],
    category: "Waterproofing"
  },
  {
    title: "Plumbing Installation",
    description:
      "End-to-end plumbing installations for apartments, villas, offices, hospitality spaces, and commercial complexes.",
    iconKey: "wrench",
    image: projectImages.plumbing,
    features: ["CPVC, PPR, UPVC lines", "Pressure testing", "Fixture installation"],
    category: "Plumbing"
  },
  {
    title: "Pipe Repairs",
    description:
      "Fast diagnosis and repair of damaged pipes, low pressure, blockages, and concealed leakage points.",
    iconKey: "hammer",
    image: projectImages.plumbing,
    features: ["Emergency repairs", "Minimal civil work", "Durable replacement"],
    category: "Plumbing"
  },
  {
    title: "Leak Detection",
    description:
      "Advanced leak identification using pressure tests, moisture mapping, and non-destructive inspection methods.",
    iconKey: "lifebuoy",
    image: projectImages.plumbing,
    features: ["Non-invasive checks", "Root-cause report", "Repair estimate"],
    category: "Plumbing"
  },
  {
    title: "Swimming Pool Construction",
    description:
      "Premium concrete pool design and construction with filtration rooms, waterproofing, lighting, and finishes.",
    iconKey: "waves",
    image: projectImages.poolConstruction,
    features: ["RCC pool shell", "Filtration systems", "Tile and coping work"],
    category: "Swimming Pools"
  },
  {
    title: "Swimming Pool Maintenance",
    description:
      "Scheduled pool cleaning, water balancing, equipment checks, and seasonal maintenance for reliable operation.",
    iconKey: "sparkles",
    image: projectImages.waterFeature,
    features: ["Water chemistry", "Filter servicing", "Preventive care"],
    category: "Swimming Pools"
  },
  {
    title: "Water Body Development",
    description:
      "Engineered ponds, reflective pools, landscape water bodies, and circulation systems for premium properties.",
    iconKey: "droplets",
    image: projectImages.waterFeature,
    features: ["Civil detailing", "Water circulation", "Waterproof lining"],
    category: "Water Features"
  },
  {
    title: "Fountain Installation",
    description:
      "Decorative and architectural fountains with pumps, nozzles, lighting, automation, and waterproofing.",
    iconKey: "sparkles",
    image: projectImages.waterFeature,
    features: ["Nozzle selection", "Lighting integration", "Pump sizing"],
    category: "Water Features"
  },
  {
    title: "Commercial Plumbing",
    description:
      "Robust plumbing networks for offices, retail, institutions, hospitals, restaurants, and multi-storey buildings.",
    iconKey: "building",
    image: projectImages.pumpRoom,
    features: ["Code-aligned execution", "Pump rooms", "Drainage systems"],
    category: "Commercial"
  },
  {
    title: "Industrial Plumbing",
    description:
      "High-capacity water supply, drainage, process lines, and utility systems for factories and warehouses.",
    iconKey: "factory",
    image: projectImages.pumpRoom,
    features: ["Utility piping", "Heavy-duty materials", "Safety planning"],
    category: "Commercial"
  },
  {
    title: "Annual Maintenance Contracts",
    description:
      "Reliable AMC plans for residential societies, hotels, offices, and facilities that need predictable upkeep.",
    iconKey: "clock",
    image: projectImages.pumpRoom,
    features: ["Scheduled inspections", "Priority support", "Detailed reports"],
    category: "Maintenance"
  }
];

const galleryProjects = [
  {
    title: "Premium Villa Pool & Deck",
    category: "Swimming Pools",
    location: "Jubilee Hills",
    image: projectImages.poolConstruction,
    description:
      "Turnkey RCC pool, filtration room, waterproofing, lighting, and stone deck for a private weekend home."
  },
  {
    title: "Commercial Terrace Waterproofing",
    category: "Waterproofing",
    location: "Gachibowli",
    image: projectImages.terraceWaterproofing,
    description:
      "12,000 sq. ft. terrace treatment with crack repair, slope correction, coating system, and flood testing."
  },
  {
    title: "Corporate Office Plumbing Upgrade",
    category: "Plumbing",
    location: "HITEC City",
    image: projectImages.plumbing,
    description:
      "Water supply and drainage upgrade completed floor-wise without interrupting daily business operations."
  },
  {
    title: "Apartment Basement Seepage Control",
    category: "Waterproofing",
    location: "Kondapur",
    image: projectImages.bathroomWaterproofing,
    description: "Injection grouting and wall treatment for an occupied residential basement."
  },
  {
    title: "Luxury Courtyard Fountain",
    category: "Water Features",
    location: "Banjara Hills",
    image: projectImages.waterFeature,
    description: "Custom fountain with underwater lighting, concealed piping, and automated controls."
  },
  {
    title: "Hotel Pool Maintenance Program",
    category: "Swimming Pools",
    location: "Shamshabad",
    image: projectImages.poolConstruction,
    description: "Monthly cleaning, chemical balancing, and equipment inspections for a boutique hotel."
  },
  {
    title: "Retail Complex Pump Room",
    category: "Commercial Projects",
    location: "Madhapur",
    image: projectImages.pumpRoom,
    description: "Utility plumbing and pump room works for a high-footfall retail complex."
  },
  {
    title: "Landscape Reflective Pool",
    category: "Water Features",
    location: "Kokapet",
    image: projectImages.waterFeature,
    description: "Minimal water body with waterproof lining, circulation, and edge detailing."
  },
  {
    title: "Industrial Drainage Network",
    category: "Commercial Projects",
    location: "Patancheru",
    image: projectImages.pumpRoom,
    description: "Heavy-duty drainage and water distribution system for an industrial facility."
  }
];

async function ensureTables(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS services (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(160) NOT NULL,
      slug VARCHAR(180) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(120) NOT NULL,
      icon_key VARCHAR(60) NOT NULL DEFAULT 'wrench',
      image_path VARCHAR(255) NOT NULL,
      features JSON NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY services_slug_unique (slug),
      KEY services_public_idx (is_active, sort_order)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS gallery_projects (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(180) NOT NULL,
      slug VARCHAR(200) NOT NULL,
      category VARCHAR(120) NOT NULL,
      location VARCHAR(120) NOT NULL,
      description TEXT NOT NULL,
      image_path VARCHAR(255) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY gallery_projects_slug_unique (slug),
      KEY gallery_public_idx (is_active, sort_order)
    )
  `);
}

async function seedServices(pool) {
  const sql = `
    INSERT INTO services
      (title, slug, description, category, icon_key, image_path, features, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      description = VALUES(description),
      category = VALUES(category),
      icon_key = VALUES(icon_key),
      image_path = VALUES(image_path),
      features = VALUES(features),
      sort_order = VALUES(sort_order),
      is_active = VALUES(is_active)
  `;

  for (const [index, service] of services.entries()) {
    await pool.query(sql, [
      service.title,
      slugify(service.title),
      service.description,
      service.category,
      service.iconKey,
      service.image,
      JSON.stringify(service.features),
      index,
      1
    ]);
  }
}

async function seedGalleryProjects(pool) {
  const sql = `
    INSERT INTO gallery_projects
      (title, slug, category, location, description, image_path, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      category = VALUES(category),
      location = VALUES(location),
      description = VALUES(description),
      image_path = VALUES(image_path),
      sort_order = VALUES(sort_order),
      is_active = VALUES(is_active)
  `;

  for (const [index, project] of galleryProjects.entries()) {
    await pool.query(sql, [
      project.title,
      slugify(project.title),
      project.category,
      project.location,
      project.description,
      project.image,
      index,
      1
    ]);
  }
}

async function main() {
  loadEnv(path.join(process.cwd(), ".env.local"));

  const pool = mysql.createPool({
    host: requireEnv("DB_HOST"),
    port: Number(process.env.DB_PORT ?? 3306),
    database: requireEnv("DB_NAME"),
    user: requireEnv("DB_USER"),
    password: requireEnv("DB_PASSWORD"),
    connectionLimit: 5,
    waitForConnections: true
  });

  try {
    await ensureTables(pool);
    await seedServices(pool);
    await seedGalleryProjects(pool);

    const [[serviceCount]] = await pool.query("SELECT COUNT(*) AS count FROM services");
    const [[projectCount]] = await pool.query("SELECT COUNT(*) AS count FROM gallery_projects");

    console.log(`Seeded ${services.length} services and ${galleryProjects.length} gallery projects.`);
    console.log(`Current table counts: services=${serviceCount.count}, gallery_projects=${projectCount.count}`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
