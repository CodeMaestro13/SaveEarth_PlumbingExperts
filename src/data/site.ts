import {
  BadgeCheck,
  Bath,
  Building2,
  Clock3,
  Droplets,
  Factory,
  Hammer,
  Headphones,
  LifeBuoy,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Waves,
  Wrench,
  Zap
} from "lucide-react";
import type { Faq, NavItem, Project, Service, Stat } from "@/types/site";

const projectImages = {
  plumbing: "/images/india-projects/indian-apartment-plumbing.png",
  terraceWaterproofing: "/images/india-projects/indian-terrace-waterproofing.png",
  bathroomWaterproofing: "/images/india-projects/indian-bathroom-waterproofing.png",
  poolConstruction: "/images/india-projects/indian-pool-construction.png",
  pumpRoom: "/images/india-projects/indian-pump-room-maintenance.png",
  waterFeature: "/images/india-projects/indian-water-feature-installation.png"
};

export const company = {
  name: "Save Earth Plumbing Experts",
  shortName: "Save Earth",
  contactPerson: "Mr Basha Khadri",
  phone: "+91 82917 22820",
  phoneHref: "tel:+918291722820",
  whatsappHref:
    "https://wa.me/918291722820?text=Hello%20Save%20Earth%20Plumbing%20Experts%2C%20I%20would%20like%20to%20request%20a%20site%20inspection.",
  email: "bashahqadri092@gmail.com",
  address: "4-614, Prem Nagar, New Hafeezpet, Hyderabad, 500049, Telangana",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM"
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export const stats: Stat[] = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "300+", label: "Happy Clients" },
  { value: "24h", label: "Rapid Response" }
];

export const trustItems = [
  { title: "Certified Professionals", icon: BadgeCheck },
  { title: "Quality Materials", icon: ShieldCheck },
  { title: "Modern Equipment", icon: Zap },
  { title: "Dedicated Support", icon: Headphones }
];

export const services: Service[] = [
  {
    title: "Terrace Waterproofing",
    description:
      "Membrane, coating, and slope-correction systems that protect exposed terraces from seepage and structural damage.",
    icon: ShieldCheck,
    image: projectImages.terraceWaterproofing,
    features: ["Surface preparation", "Elastomeric coating", "Flood testing"],
    category: "Waterproofing"
  },
  {
    title: "Roof Waterproofing",
    description:
      "Durable roof waterproofing for residential, commercial, and industrial buildings with long-term performance.",
    icon: Building2,
    image: projectImages.terraceWaterproofing,
    features: ["Heat reflective options", "Joint treatment", "Warranty support"],
    category: "Waterproofing"
  },
  {
    title: "Basement Waterproofing",
    description:
      "Negative-side and positive-side waterproofing systems for basements, retaining walls, and underground structures.",
    icon: Droplets,
    image: projectImages.pumpRoom,
    features: ["Injection grouting", "Drainage planning", "Crack sealing"],
    category: "Waterproofing"
  },
  {
    title: "Bathroom Waterproofing",
    description:
      "Pre-tile waterproofing and wet-area sealing for bathrooms, kitchens, utility areas, and balconies.",
    icon: Bath,
    image: projectImages.bathroomWaterproofing,
    features: ["Pipe collar sealing", "Tile-compatible layers", "Leak prevention"],
    category: "Waterproofing"
  },
  {
    title: "Plumbing Installation",
    description:
      "End-to-end plumbing installations for apartments, villas, offices, hospitality spaces, and commercial complexes.",
    icon: Wrench,
    image: projectImages.plumbing,
    features: ["CPVC, PPR, UPVC lines", "Pressure testing", "Fixture installation"],
    category: "Plumbing"
  },
  {
    title: "Pipe Repairs",
    description:
      "Fast diagnosis and repair of damaged pipes, low pressure, blockages, and concealed leakage points.",
    icon: Hammer,
    image: projectImages.plumbing,
    features: ["Emergency repairs", "Minimal civil work", "Durable replacement"],
    category: "Plumbing"
  },
  {
    title: "Leak Detection",
    description:
      "Advanced leak identification using pressure tests, moisture mapping, and non-destructive inspection methods.",
    icon: LifeBuoy,
    image: projectImages.plumbing,
    features: ["Non-invasive checks", "Root-cause report", "Repair estimate"],
    category: "Plumbing"
  },
  {
    title: "Swimming Pool Construction",
    description:
      "Premium concrete pool design and construction with filtration rooms, waterproofing, lighting, and finishes.",
    icon: Waves,
    image: projectImages.poolConstruction,
    features: ["RCC pool shell", "Filtration systems", "Tile and coping work"],
    category: "Swimming Pools"
  },
  {
    title: "Swimming Pool Maintenance",
    description:
      "Scheduled pool cleaning, water balancing, equipment checks, and seasonal maintenance for reliable operation.",
    icon: Sparkles,
    image: projectImages.waterFeature,
    features: ["Water chemistry", "Filter servicing", "Preventive care"],
    category: "Swimming Pools"
  },
  {
    title: "Water Body Development",
    description:
      "Engineered ponds, reflective pools, landscape water bodies, and circulation systems for premium properties.",
    icon: Droplets,
    image: projectImages.waterFeature,
    features: ["Civil detailing", "Water circulation", "Waterproof lining"],
    category: "Water Features"
  },
  {
    title: "Fountain Installation",
    description:
      "Decorative and architectural fountains with pumps, nozzles, lighting, automation, and waterproofing.",
    icon: Sparkles,
    image: projectImages.waterFeature,
    features: ["Nozzle selection", "Lighting integration", "Pump sizing"],
    category: "Water Features"
  },
  {
    title: "Commercial Plumbing",
    description:
      "Robust plumbing networks for offices, retail, institutions, hospitals, restaurants, and multi-storey buildings.",
    icon: Building2,
    image: projectImages.pumpRoom,
    features: ["Code-aligned execution", "Pump rooms", "Drainage systems"],
    category: "Commercial"
  },
  {
    title: "Industrial Plumbing",
    description:
      "High-capacity water supply, drainage, process lines, and utility systems for factories and warehouses.",
    icon: Factory,
    image: projectImages.pumpRoom,
    features: ["Utility piping", "Heavy-duty materials", "Safety planning"],
    category: "Commercial"
  },
  {
    title: "Annual Maintenance Contracts",
    description:
      "Reliable AMC plans for residential societies, hotels, offices, and facilities that need predictable upkeep.",
    icon: Clock3,
    image: projectImages.pumpRoom,
    features: ["Scheduled inspections", "Priority support", "Detailed reports"],
    category: "Maintenance"
  }
];

export const serviceScopes = [
  {
    title: "Plumbing Works",
    description:
      "Complete internal and external water supply piping for residential, commercial, and industrial properties.",
    items: [
      "Internal Water Supply System",
      "External Water Supply System",
      "Hot & Cold Water Piping",
      "CPVC Piping",
      "UPVC Piping",
      "PEX Piping",
      "SS Piping",
      "HDPE Piping",
      "GI & MS Piping",
      "Copper Piping"
    ]
  },
  {
    title: "Drainage & Sanitary Works",
    description:
      "Reliable sanitary, sewage, rainwater, and storm water drainage systems with proper inspection access.",
    items: [
      "Soil & Waste Water Piping",
      "Rainwater Drainage System",
      "Storm Water Drainage",
      "Sewage System Installation",
      "Sewer Line Connection",
      "Manhole Construction",
      "Inspection Chambers"
    ]
  },
  {
    title: "Pump Installation",
    description:
      "Pump selection, installation, piping, controls, and commissioning for water transfer and pressure systems.",
    items: [
      "Transfer Pumps",
      "Booster Pumps",
      "Pressure Pumps",
      "Dewatering Pumps",
      "Sewage Pumps",
      "Sump Pump Installation",
      "Pump Control Panels"
    ]
  },
  {
    title: "Water Tank Works",
    description:
      "Water tank piping and connection work for underground, overhead, domestic, and utility water systems.",
    items: [
      "Underground Water Tank",
      "Overhead Water Tank",
      "Water Tank Piping",
      "Tank Cleaning Connections",
      "Float Valve Installation"
    ]
  },
  {
    title: "Bathroom & Kitchen Works",
    description:
      "Fixture installation and concealed plumbing for bathrooms, kitchens, utility rooms, and wet areas.",
    items: [
      "WC Installation",
      "Wash Basin Installation",
      "Shower Systems",
      "Kitchen Sink Installation",
      "Health Faucet Installation",
      "Mixer Installation",
      "Concealed Plumbing"
    ]
  }
];

export const featuredProjects: Project[] = [
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
  }
];

export const galleryProjects: Project[] = [
  ...featuredProjects,
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

export const whyChooseUs = [
  { title: "Experienced Team", icon: BadgeCheck },
  { title: "Quality Materials", icon: ShieldCheck },
  { title: "Modern Equipment", icon: Zap },
  { title: "Fast Service", icon: Clock3 },
  { title: "Affordable Pricing", icon: PhoneCall },
  { title: "Customer Satisfaction", icon: Sparkles }
];

export const serviceAreas = [
  "Hyderabad",
  "Secunderabad",
  "Gachibowli",
  "HITEC City",
  "Madhapur",
  "Kondapur",
  "Jubilee Hills",
  "Banjara Hills",
  "Kokapet",
  "Patancheru Industrial Area"
];

export const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Villa Owner, Jubilee Hills",
    quote:
      "Save Earth Plumbing Experts delivered our pool and waterproofing scope with disciplined planning. The finish is excellent and the team kept the site clean throughout."
  },
  {
    name: "Priya Nair",
    role: "Facility Manager, Gachibowli",
    quote:
      "Their leak detection saved us from unnecessary breaking work. The report was clear, the repair was fast, and the seepage has not returned."
  },
  {
    name: "Sandeep Kulkarni",
    role: "Builder, Hyderabad",
    quote:
      "We use Save Earth Plumbing Experts for waterproofing and plumbing packages because their documentation, manpower, and quality checks are dependable."
  }
];

export const faqs: Faq[] = [
  {
    question: "Do you provide a free site inspection?",
    answer:
      "Yes. We provide an initial consultation and site inspection for most residential and commercial projects. Larger technical audits may require a separate assessment fee."
  },
  {
    question: "Which waterproofing system is best for terraces?",
    answer:
      "The right system depends on surface condition, slope, existing cracks, usage, and exposure. We commonly recommend elastomeric coatings, membrane systems, or a hybrid solution after inspection."
  },
  {
    question: "How long does terrace waterproofing take?",
    answer:
      "A typical residential terrace can take 3 to 7 working days, including surface preparation, treatment, curing, and flood testing. Larger areas require a project-specific schedule."
  },
  {
    question: "Can you fix leakage without breaking tiles?",
    answer:
      "In many cases, yes. We first identify the source through inspection and testing. If the leakage comes from joints, cracks, or plumbing points, non-destructive repair may be possible."
  },
  {
    question: "Do you handle both plumbing and civil repair work?",
    answer:
      "Yes. Our team coordinates plumbing, waterproofing, minor civil repairs, tiling support, and finishing work where required for a complete solution."
  },
  {
    question: "Do you build custom swimming pools?",
    answer:
      "Yes. We design and construct RCC pools, plunge pools, kids pools, overflow pools, and private villa pools with filtration, lighting, waterproofing, and finishes."
  },
  {
    question: "Do you provide swimming pool maintenance?",
    answer:
      "Yes. We offer one-time cleaning and scheduled maintenance plans covering water balancing, vacuuming, filter checks, pump servicing, and preventive care."
  },
  {
    question: "What materials do you use for plumbing installations?",
    answer:
      "We work with CPVC, UPVC, PPR, HDPE, GI, and other approved piping systems based on pressure, temperature, usage, and project specifications."
  },
  {
    question: "Do you provide warranties?",
    answer:
      "Warranty terms depend on the service, materials, site condition, and scope. Waterproofing projects typically include written warranty details after technical evaluation."
  },
  {
    question: "Can you work in occupied homes and offices?",
    answer:
      "Yes. We plan work zones, dust control, water shutdowns, and daily cleanup to reduce disruption in occupied homes, offices, hotels, and societies."
  },
  {
    question: "Do you accept commercial and industrial projects?",
    answer:
      "Yes. We execute plumbing, waterproofing, pump room, drainage, and maintenance scopes for offices, factories, warehouses, institutions, and hospitality spaces."
  },
  {
    question: "How do you detect concealed leaks?",
    answer:
      "We use pressure testing, moisture mapping, fixture isolation, visual inspection, and practical site checks to narrow down the source before recommending repairs."
  },
  {
    question: "Do you offer annual maintenance contracts?",
    answer:
      "Yes. AMC plans are available for residential societies, commercial facilities, hotels, and premium homes requiring periodic plumbing, pool, and water system maintenance."
  },
  {
    question: "Which locations do you serve?",
    answer:
      "We serve Hyderabad, Secunderabad, Gachibowli, HITEC City, Madhapur, Kondapur, Jubilee Hills, Banjara Hills, Kokapet, Patancheru, and nearby commercial and industrial zones."
  },
  {
    question: "How can I request a quotation?",
    answer:
      "You can call, WhatsApp, or submit the contact form with your project details. Our team will schedule an inspection and share a clear scope-based estimate."
  }
];

export const galleryCategories = [
  "All",
  "Waterproofing",
  "Plumbing",
  "Swimming Pools",
  "Water Features",
  "Commercial Projects"
];

export const contactCards = [
  { label: "Contact Person", value: company.contactPerson, icon: BadgeCheck },
  { label: "Phone", value: company.phone, icon: PhoneCall },
  { label: "Email", value: company.email, icon: Headphones },
  { label: "Office", value: company.address, icon: MapPin },
  { label: "Hours", value: company.hours, icon: Clock3 }
];
