
import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsData: Product[] = [
    {
      id: '1',
      name: 'Lumina Sound Pro',
      price: 299.99,
      category: 'Audio',
      description: 'Experience pure sound with active noise cancellation and spatial audio.',
      image: 'https://picsum.photos/id/1/600/600',
      images: [
        'https://picsum.photos/id/1/800/800',
        'https://picsum.photos/id/10/800/800',
        'https://picsum.photos/id/20/800/800'
      ],
      rating: 4.8,
      stock: 12,
      specs: {
        'Battery Life': 'Up to 30 hours',
        'Noise Cancellation': 'Active (40dB)',
        'Connectivity': 'Bluetooth 5.3',
        'Weight': '250g'
      }
    },
    {
      id: '2',
      name: 'Aura Smart Watch',
      price: 199.50,
      category: 'Wearables',
      description: 'The ultimate fitness companion with a stunning OLED display.',
      image: 'https://picsum.photos/id/2/600/600',
      images: [
        'https://picsum.photos/id/2/800/800',
        'https://picsum.photos/id/3/800/800',
        'https://picsum.photos/id/4/800/800'
      ],
      rating: 4.5,
      stock: 5,
      specs: {
        'Display': '1.4" OLED 1000 nits',
        'Water Resistance': '5 ATM',
        'Sensors': 'ECG, SpO2, Heart Rate',
        'Battery': '7 days'
      }
    },
    {
      id: '3',
      name: 'Zenith Keyboard',
      price: 149.00,
      category: 'Accessories',
      description: 'Tactile mechanical switches for the ultimate typing experience.',
      image: 'https://picsum.photos/id/3/600/600',
      images: [
        'https://picsum.photos/id/160/800/800',
        'https://picsum.photos/id/161/800/800',
        'https://picsum.photos/id/162/800/800'
      ],
      rating: 4.9,
      stock: 20,
      specs: {
        'Switches': 'Mechanical (Brown)',
        'Layout': 'Tenkeyless (80%)',
        'Backlight': 'RGB Per-Key',
        'Polling Rate': '1000Hz'
      }
    },
    {
      id: '4',
      name: 'Apex Gaming Mouse',
      price: 89.00,
      category: 'Accessories',
      description: 'Ultra-lightweight mouse with high precision sensor.',
      image: 'https://picsum.photos/id/4/600/600',
      images: [
        'https://picsum.photos/id/4/800/800',
        'https://picsum.photos/id/5/800/800',
        'https://picsum.photos/id/6/800/800'
      ],
      rating: 4.7,
      stock: 15,
      specs: {
        'Weight': '54g',
        'DPI': '26,000 DPI',
        'Sensor': 'Apex Precision Gen 2',
        'Battery': '80 hours'
      }
    },
    {
      id: '5',
      name: 'Lumina Pad Ultra',
      price: 649.00,
      category: 'Tablets',
      description: 'Powerful performance and a beautiful 12-inch display.',
      image: 'https://picsum.photos/id/5/600/600',
      images: [
        'https://picsum.photos/id/5/800/800',
        'https://picsum.photos/id/8/800/800',
        'https://picsum.photos/id/9/800/800'
      ],
      rating: 4.6,
      stock: 8,
      specs: {
        'Display': '12.4" Liquid Retina',
        'Processor': 'A16 Pro Bionic',
        'Storage': '256GB / 512GB',
        'Stylus': 'Lumina Pencil Gen 3 Support'
      }
    },
    {
      id: '6',
      name: 'Solar Power Bank',
      price: 59.99,
      category: 'Power',
      description: 'Eco-friendly energy on the go for all your devices.',
      image: 'https://picsum.photos/id/6/600/600',
      images: [
        'https://picsum.photos/id/6/800/800',
        'https://picsum.photos/id/11/800/800',
        'https://picsum.photos/id/12/800/800'
      ],
      rating: 4.2,
      stock: 30,
      specs: {
        'Capacity': '20,000 mAh',
        'Solar Efficiency': '22.5%',
        'Ports': '2x USB-C, 1x USB-A',
        'Charging Speed': '45W PD Fast Charge'
      }
    },
    {
      id: '7',
      name: 'Vision 4K Monitor',
      price: 449.00,
      category: 'Computing',
      description: 'Professional 27-inch 4K monitor with IPS panel and HDR support.',
      image: 'https://picsum.photos/id/7/600/600',
      images: [
        'https://picsum.photos/id/7/800/800',
        'https://picsum.photos/id/201/800/800',
        'https://picsum.photos/id/202/800/800'
      ],
      rating: 4.8,
      stock: 10,
      specs: {
        'Resolution': '3840 x 2160',
        'Refresh Rate': '144Hz',
        'Panel Type': 'IPS Black',
        'Power Delivery': 'USB-C 90W'
      }
    },
    {
      id: '8',
      name: 'Nano Laptop Pro',
      price: 1299.00,
      category: 'Computing',
      description: 'Ultra-slim laptop with powerful M-series chip for creators.',
      image: 'https://picsum.photos/id/8/600/600',
      images: [
        'https://picsum.photos/id/8/800/800',
        'https://picsum.photos/id/48/800/800',
        'https://picsum.photos/id/49/800/800'
      ],
      rating: 4.9,
      stock: 7,
      specs: {
        'CPU': 'Lumina X1 Extreme',
        'Memory': '32GB Unified',
        'Storage': '1TB SSD',
        'Battery': '22 hours'
      }
    },
    {
      id: '9',
      name: 'Optix Cinema Camera',
      price: 899.00,
      category: 'Photography',
      description: 'Mirrorless camera designed for high-end cinematic video production.',
      image: 'https://picsum.photos/id/9/600/600',
      images: [
        'https://picsum.photos/id/9/800/800',
        'https://picsum.photos/id/250/800/800',
        'https://picsum.photos/id/251/800/800'
      ],
      rating: 4.7,
      stock: 4,
      specs: {
        'Sensor': 'Full Frame 36MP',
        'Video': '8K 30fps / 4K 120fps',
        'IBIS': '8-Stops',
        'Autofocus': 'AI Object Tracking'
      }
    },
    {
      id: '10',
      name: 'Nexus Smart Hub',
      price: 129.00,
      category: 'Audio',
      description: 'The center of your smart home with premium room-filling sound.',
      image: 'https://picsum.photos/id/10/600/600',
      images: [
        'https://picsum.photos/id/10/800/800',
        'https://picsum.photos/id/100/800/800',
        'https://picsum.photos/id/101/800/800'
      ],
      rating: 4.4,
      stock: 25,
      specs: {
        'Speakers': 'Dual 2.5" Drivers',
        'Screen': '7" Touch Display',
        'Wireless': 'WiFi 6E, Zigbee',
        'Privacy': 'Physical Mic Mute'
      }
    },
    {
      id: '11',
      name: 'Titan Phone Max',
      price: 999.00,
      category: 'Mobile',
      description: 'The ultimate smartphone featuring a titanium frame and periscope lens.',
      image: 'https://picsum.photos/id/11/600/600',
      images: [
        'https://picsum.photos/id/11/800/800',
        'https://picsum.photos/id/110/800/800',
        'https://picsum.photos/id/111/800/800'
      ],
      rating: 4.9,
      stock: 14,
      specs: {
        'Display': '6.8" 120Hz LTPO',
        'Camera': '200MP Main / 5x Optical',
        'Processor': 'Titan A2 Chip',
        'Durability': 'IP68 Titanium'
      }
    },
    {
      id: '12',
      name: 'Velox SSD 2TB',
      price: 189.00,
      category: 'Storage',
      description: 'Hyper-fast external NVMe storage with rugged protection.',
      image: 'https://picsum.photos/id/12/600/600',
      images: [
        'https://picsum.photos/id/12/800/800',
        'https://picsum.photos/id/120/800/800',
        'https://picsum.photos/id/121/800/800'
      ],
      rating: 4.8,
      stock: 40,
      specs: {
        'Speed': 'Read: 7.5GB/s',
        'Interface': 'USB 4.0 / Thunderbolt',
        'Drop Resistance': '3 Meters',
        'Encryption': 'AES 256-bit'
      }
    },
    {
      id: '13',
      name: 'Specter Gaming PC',
      price: 2499.00,
      category: 'Gaming',
      description: 'Liquid-cooled gaming powerhouse with the latest GPU technology.',
      image: 'https://picsum.photos/id/13/600/600',
      images: [
        'https://picsum.photos/id/13/800/800',
        'https://picsum.photos/id/14/800/800',
        'https://picsum.photos/id/15/800/800'
      ],
      rating: 5.0,
      stock: 3,
      specs: {
        'GPU': 'RTX 5090 Prototype',
        'CPU': 'Ryzen 9 9950X',
        'RAM': '64GB DDR5 6400MHz',
        'Cooling': '360mm AIO Liquid'
      }
    },
    {
      id: '14',
      name: 'Glow Ambient Light',
      price: 79.50,
      category: 'Smart Home',
      description: 'Intelligent ambient lighting that syncs with your music and screens.',
      image: 'https://picsum.photos/id/14/600/600',
      images: [
        'https://picsum.photos/id/14/800/800',
        'https://picsum.photos/id/15/800/800',
        'https://picsum.photos/id/16/800/800'
      ],
      rating: 4.3,
      stock: 18,
      specs: {
        'Lumens': '1800 lm',
        'Connectivity': 'Matter, Thread',
        'Colors': '16.8 Million RGB',
        'Voice Control': 'Alexa, Siri, Google'
      }
    },
    {
      id: '15',
      name: 'Pulse Sport Buds',
      price: 159.00,
      category: 'Audio',
      description: 'Military-grade rugged earbuds designed for extreme athletics.',
      image: 'https://picsum.photos/id/15/600/600',
      images: [
        'https://picsum.photos/id/15/800/800',
        'https://picsum.photos/id/16/800/800',
        'https://picsum.photos/id/17/800/800'
      ],
      rating: 4.7,
      stock: 22,
      specs: {
        'Durability': 'IPX8 Waterproof',
        'Fit': 'Bio-Adaptive Wings',
        'Playtime': '10h / 40h with Case',
        'Driver': '12mm Titanium Diaphragm'
      }
    },
    {
      id: '16',
      name: 'Vector Drone 4K',
      price: 749.00,
      category: 'Photography',
      description: 'Compact foldable drone with 3-axis gimbal and 4K 60fps recording.',
      image: 'https://picsum.photos/id/16/600/600',
      images: [
        'https://picsum.photos/id/16/800/800',
        'https://picsum.photos/id/17/800/800',
        'https://picsum.photos/id/18/800/800'
      ],
      rating: 4.6,
      stock: 6,
      specs: {
        'Flight Time': '45 Minutes',
        'Transmission': '15km HD Video',
        'Obstacle Avoidance': '360 Degree Sensors',
        'Max Speed': '72 km/h'
      }
    },
    {
      id: '17',
      name: 'Oasis E-Reader',
      price: 219.00,
      category: 'Mobile',
      description: 'Ergonomic e-reader with warm light adjustment and waterproof design.',
      image: 'https://picsum.photos/id/17/600/600',
      images: [
        'https://picsum.photos/id/17/800/800',
        'https://picsum.photos/id/18/800/800',
        'https://picsum.photos/id/19/800/800'
      ],
      rating: 4.8,
      stock: 11,
      specs: {
        'Display': '7" 300 ppi Paperwhite',
        'Storage': '32GB',
        'Waterproofing': 'IPX8',
        'Page Turns': 'Physical Buttons'
      }
    },
    {
      id: '18',
      name: 'Nomad Travel Hub',
      price: 119.00,
      category: 'Power',
      description: 'All-in-one charging station for international professional travelers.',
      image: 'https://picsum.photos/id/18/600/600',
      images: [
        'https://picsum.photos/id/18/800/800',
        'https://picsum.photos/id/19/800/800',
        'https://picsum.photos/id/20/800/800'
      ],
      rating: 4.5,
      stock: 35,
      specs: {
        'Total Power': '140W GaN',
        'Connectors': '3x USB-C, 1x USB-A',
        'Plug System': 'Universal Exchangeable',
        'Weight': '190g'
      }
    },
    {
      id: '19',
      name: 'Vantage VR Headset',
      price: 549.00,
      category: 'Gaming',
      description: 'Crystal-clear standalone VR with mixed reality pass-through.',
      image: 'https://picsum.photos/id/19/600/600',
      images: [
        'https://picsum.photos/id/19/800/800',
        'https://picsum.photos/id/20/800/800',
        'https://picsum.photos/id/21/800/800'
      ],
      rating: 4.4,
      stock: 9,
      specs: {
        'Resolution': '2160 x 2160 per eye',
        'Pass-through': '4K Color Stereo',
        'Tracking': 'Inside-out AI',
        'Refresh Rate': '120Hz'
      }
    },
    {
      id: '20',
      name: 'Stream Control Deck',
      price: 149.00,
      category: 'Accessories',
      description: 'Personalize your workflow with 15 LCD keys for infinite control.',
      image: 'https://picsum.photos/id/20/600/600',
      images: [
        'https://picsum.photos/id/20/800/800',
        'https://picsum.photos/id/21/800/800',
        'https://picsum.photos/id/22/800/800'
      ],
      rating: 4.9,
      stock: 16,
      specs: {
        'Keys': '15x Dynamic LCD',
        'Interface': 'USB-C',
        'Integration': 'OBS, Twitch, Elgato',
        'Stand': 'Adjustable Angle'
      }
    }
  ];

  products = signal<Product[]>(this.productsData);

  getProductById(id: string): Product | undefined {
    return this.productsData.find(p => p.id === id);
  }

  getFeaturedProducts(): Product[] {
    return this.productsData.slice(0, 3);
  }
}
