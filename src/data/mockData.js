// Indian Context Mock Data for BRIVIO AI-Native Creative Marketplace

export const INITIAL_CREATORS = [
  {
    id: 'aarav-sharma',
    name: 'Aarav Sharma',
    handle: '@aarav_cinevfx',
    title: 'AI Film Director & Bollywood VFX Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    location: 'Mumbai (Film City / Bandra)',
    bio: 'Pioneering narrative AI cinema for Indian cinema, OTT streaming, and premium TVCs. Master of Kling 1.5 camera rigs, ComfyUI node workflows, and DaVinci Resolve color grading. Directing campaigns for Tata, Titan, and top streaming originals.',
    rating: 4.98,
    reviewsCount: 52,
    hourlyRate: 14500,
    projectMinimum: 280000,
    turnaround: 'Under 1 Week',
    turnaroundBadge: '⚡ Rush Available (48h)',
    clearToAirCertified: true,
    benchmarkScore: '99.4%',
    characterConsistencyIndex: 98,
    specializations: ['AI Filmmaking', 'Character Consistency', 'Motion Graphics'],
    primaryTools: ['Kling 1.5', 'ComfyUI', 'DaVinci Resolve', 'Runway Gen-3', 'ElevenLabs'],
    verificationTier: 'Enterprise Verified',
    c2paProvenanceReady: true,
    commercialTier: 'ASCI Compliant & Full IP Indemnity',
    stats: {
      completedBriefs: 46,
      repeatClients: '94%',
      averageDeliveryDays: 3.8,
      totalFramesGenerated: '2.1M+'
    },
    featuredRecipe: {
      title: 'Kashi 2085: Cyber-Ghats Anamorphic Teaser',
      thumbnail: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      aspectRatio: '2.39:1 Anamorphic Cinema',
      resolution: '4K DCI (3840x1600)',
      baseModels: ['Kling 1.5 Pro', 'ComfyUI Orchestrator', 'Topaz Video AI 4K'],
      loraStack: [
        { name: 'Varanasi Ganga Aarti Golden Hour Flare LoRA', weight: 0.82, source: 'Proprietary Indian Heritage Lab' },
        { name: 'Actor Facial Anchor IP-Adapter v2', weight: 0.92, source: 'Client Face Keyframe' }
      ],
      audioPipeline: 'Classical Shehnai & Sitar stems blended with 808 cinematic sub-bass rumble + ElevenLabs Hindi voiceover',
      commercialClearance: {
        clearToAir: true,
        licenseTier: 'ASCI Synthetic Disclosure Certified • Enterprise Full Buyout',
        c2paHash: 'c2pa:sha256:7b92bd39a48f0291e9f029c7b94a821e',
        trainingConsent: 'MeitY compliant synthetic dataset, zero scraped copyrighted IP'
      },
      promptArchitecture: {
        positiveSnippet: 'cinematic 35mm anamorphic wide shot, protagonist walking through misty Varanasi ghats illuminated by floating brass diyas and neon holographic mandalas, sacred river reflections on wet stone steps, golden hour sunset caustics, natural 24fps shutter cadence',
        negativeSnippet: 'plastic skin, mutated hands, distorted temple architecture, extra limbs, cartoonish saturation',
        cameraSettings: 'Pan right 3.8 deg/sec, Arri Alexa 35mm anamorphic prime, T2.0 depth of field',
        seedLock: '7829104821',
        cfgScale: 7.0,
        sampler: 'Euler A + DPM++ SDE Karras (42 steps)'
      }
    },
    portfolio: [
      {
        id: 'as-work-1',
        title: 'Kashi 2085: Cyber-Ghats Anamorphic Teaser',
        type: 'Cinematic Video',
        duration: '0:45',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
        tags: ['Kling 1.5', 'ComfyUI', 'Topaz 4K', 'Clear-to-Air™'],
        views: '38.4k',
        awards: '🏆 FICCI AI Best Short Winner',
        recipe: {
          baseModels: ['Kling 1.5 Pro', 'ComfyUI', 'Topaz Video AI 4K'],
          loras: ['Ganga Aarti Flare LoRA v2.2', 'Face Anchor v4'],
          audio: 'Shehnai stems + 808 Sub-bass',
          clearToAir: true,
          seedLock: '7829104821',
          tokens: ['anamorphic flare', 'Varanasi ghats', 'brass diyas', '24fps cinema']
        }
      },
      {
        id: 'as-work-2',
        title: 'CRED: Neo-Noir 90s Mumbai Action Chase',
        type: 'Motion Campaign',
        duration: '0:30',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80',
        tags: ['Runway Gen-3', 'ComfyUI', 'Kling 1.5'],
        views: '54.2k',
        awards: '🔥 18M+ Viral Organic Reach',
        recipe: {
          baseModels: ['Runway Gen-3 Alpha', 'ComfyUI Motion RIFE'],
          loras: ['Vintage Bollywood 35mm LoRA', 'Mumbai Rain Reflections'],
          audio: 'Retro analog synth + 90s action foley',
          clearToAir: true,
          seedLock: '9182374652',
          tokens: ['yellow taxi chase', 'monsoon rain asphalt', 'neon street signs', 'film grain']
        }
      }
    ]
  },
  {
    id: 'ananya-iyer',
    name: 'Ananya Iyer',
    handle: '@ananya_textiles',
    title: 'Consistent Virtual Haute Couture & Bridal Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    location: 'Bengaluru / Chennai',
    bio: 'Creator of the 98% Character Consistency Benchmark for Indian Bridal & Luxury Textiles. Specialized in training bespoke LoRAs for Kanjeevaram silk weave authenticity, Kundan jewellery refractions, and multi-scene Indian couture lookbooks without facial drift.',
    rating: 5.0,
    reviewsCount: 64,
    hourlyRate: 16000,
    projectMinimum: 350000,
    turnaround: 'Under 1 Week',
    turnaroundBadge: '🎯 Top Consistency Rating (98%)',
    clearToAirCertified: true,
    benchmarkScore: '99.7%',
    characterConsistencyIndex: 98,
    specializations: ['Character Consistency', 'Fashion/Product', 'AI Filmmaking'],
    primaryTools: ['Midjourney v6.1', 'ComfyUI', 'Flux.1', 'Runway Gen-3'],
    verificationTier: 'Commercial Safety Certified',
    c2paProvenanceReady: true,
    commercialTier: 'ASCI Compliant & Clear-to-Air™ India',
    stats: {
      completedBriefs: 72,
      repeatClients: '98%',
      averageDeliveryDays: 3.2,
      totalFramesGenerated: '2.8M+'
    },
    featuredRecipe: {
      title: 'Rani of Mewar: 10-Scene Sabyasachi & Kanjeevaram Capsule',
      thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      aspectRatio: '9:16 Vertical & 16:9 Cinema Dual',
      resolution: '8K Print Master & 4K ProRes Motion',
      baseModels: ['Midjourney v6.1 (--cref + --sref)', 'ComfyUI IP-Adapter FaceID Plus v2', 'Flux.1 Kontext'],
      loraStack: [
        { name: 'Pure Zari Gold Thread Weave LoRA v3.4', weight: 0.94, source: 'Artisanal Textile Scan Archive' },
        { name: 'Kundan Polki Gemstone Caustics LoRA', weight: 0.85, source: 'Heritage Jewellery Lab' }
      ],
      audioPipeline: 'Carnatic ambient veena and temple bells acoustic room tone with spatial binaural mastering',
      commercialClearance: {
        clearToAir: true,
        licenseTier: 'Global Exclusive Buyout Tier 1 • ASCI Verified',
        c2paHash: 'c2pa:sha256:d81a92e847c1b827364501928374aef5',
        trainingConsent: '100% synthetic model consent release with signed biometric affidavit'
      },
      promptArchitecture: {
        positiveSnippet: 'editorial fashion portrait of Indian royal bride Tara, consistent distinctive cheekbones and deep hazel eyes, wearing heirloom crimson Kanjeevaram silk saree with real gold zari borders, intricate uncut diamond polki choker, Udaipur palace marble courtyard at golden hour, Hasselblad H6D-100c medium format texture',
        negativeSnippet: 'plastic doll skin, blurred embroidery, asymmetrical eyes, distorted jewellery settings, western wedding elements',
        cameraSettings: 'Hasselblad 100mm f/2.2, natural ambient warm bounce reflector, ISO 64',
        seedLock: '9182736455',
        cfgScale: 6.8,
        sampler: 'DPM++ 2M Karras, 45 steps'
      }
    },
    portfolio: [
      {
        id: 'ai-work-1',
        title: 'Rani of Mewar: 10-Scene Sabyasachi Capsule',
        type: 'Bridal Couture Campaign',
        duration: '10 Stills + 2 Motion Clips',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        tags: ['Midjourney v6.1', 'IP-Adapter', 'Character Index 98%'],
        views: '42.1k',
        awards: '🏆 Vogue India Digital Fashion Winner',
        recipe: {
          baseModels: ['Midjourney v6.1', 'ComfyUI IP-Adapter', 'Flux.1 Fill'],
          loras: ['Pure Zari LoRA v3.4', 'Kundan Polki Refraction'],
          audio: 'Ambient Veena + Temple Bells',
          clearToAir: true,
          seedLock: '9182736455',
          tokens: ['consistent royal bride', 'Kanjeevaram silk', 'polki choker', 'Udaipur palace']
        }
      },
      {
        id: 'ai-work-2',
        title: 'Tanishq Rivaah: Heritage Gold Micro-Short',
        type: 'Motion Campaign',
        duration: '0:30',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
        tags: ['Runway Gen-3', 'ComfyUI', 'Topaz 4K'],
        views: '29.3k',
        awards: 'Tanishq Brand Innovation Feature',
        recipe: {
          baseModels: ['Runway Gen-3 Alpha', 'Topaz Video AI 4K'],
          loras: ['Gold Filigree Macro LoRA', 'Royal Palace Lighting'],
          audio: 'Indian flute and orchestral crescendo',
          clearToAir: true,
          seedLock: '4928172940',
          tokens: ['22k gold filigree', 'temple architecture', 'slow motion 60fps', 'warm lighting']
        }
      }
    ]
  },
  {
    id: 'rohan-kulkarni',
    name: 'Rohan Kulkarni',
    handle: '@rohan_cgi3d',
    title: 'Generative 3D & EV Automotive CGI Artist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    location: 'Pune / Bengaluru',
    bio: 'Bridging Flux.1 Pro depth passes, Blender geometry nodes, and ControlNet normal maps for Indian auto OEMs (Mahindra, Tata Motors, Ola Electric). Generating millimeter CAD-accurate photorealistic concept vehicles on Ladakh passes and salt flats.',
    rating: 4.96,
    reviewsCount: 44,
    hourlyRate: 12500,
    projectMinimum: 220000,
    turnaround: '24h Rush',
    turnaroundBadge: '⚡ 24h Rush Available',
    clearToAirCertified: true,
    benchmarkScore: '98.9%',
    characterConsistencyIndex: 95,
    specializations: ['3D & VFX', 'Fashion/Product', 'Motion Graphics'],
    primaryTools: ['Flux.1', 'ControlNet', 'Blender', 'ComfyUI', 'Kling 1.5'],
    verificationTier: 'Benchmark Tested',
    c2paProvenanceReady: true,
    commercialTier: 'Full Buyout & CAD Cleared',
    stats: {
      completedBriefs: 58,
      repeatClients: '91%',
      averageDeliveryDays: 2.1,
      totalFramesGenerated: '1.4M+'
    },
    featuredRecipe: {
      title: 'Mahindra Thar EV: Cyber-Ladakh Desert Odyssey',
      thumbnail: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
      aspectRatio: '16:9 Cinema 4K',
      resolution: '3840x2160 UHD Master',
      baseModels: ['Flux.1 Pro', 'ControlNet Depth & Normal', 'Blender Hybrid Cycles'],
      loraStack: [
        { name: 'Pangong Tso Saline Dust & Sand Scatter LoRA', weight: 0.88, source: 'Proprietary Scan Lab' },
        { name: 'Matte Military Khaki Metal Finish LoRA', weight: 0.90, source: 'Automotive CAD Library' }
      ],
      audioPipeline: 'High-torque synthetic EV motor hum + gravel spit sound foley',
      commercialClearance: {
        clearToAir: true,
        licenseTier: 'Full Automotive Commercial Buyout',
        c2paHash: 'c2pa:sha256:3a180cf91a384b0198e3bcf91288bcf0',
        trainingConsent: 'Synthetic 3D CAD mesh training pipelines'
      },
      promptArchitecture: {
        positiveSnippet: 'aggressive futuristic electric 4x4 SUV drifting across Pangong Lake frozen saline crust at sunset, snowcapped Himalayan peaks in background, high-resolution dust rooster tails, amber LED lightbar piercing twilight mist, photorealistic automotive photography',
        negativeSnippet: 'unrealistic tire deformation, warped logos, blurry mountain horizon, low-poly rendering',
        cameraSettings: 'DJI Inspire 3 drone chase cam sim, 35mm f/2.8, low-angle ground tracker at 60 km/h',
        seedLock: '5521908471',
        cfgScale: 5.5,
        sampler: 'Flux Euler Simple, 34 steps'
      }
    },
    portfolio: [
      {
        id: 'rk-work-1',
        title: 'Mahindra Thar EV: Cyber-Ladakh Desert Odyssey',
        type: '3D Automotive VFX',
        duration: '0:35',
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
        tags: ['Flux.1', 'ControlNet', 'Blender', 'Clear-to-Air™'],
        views: '36.8k',
        awards: 'Auto Expo Digital Showcase 2026',
        recipe: {
          baseModels: ['Flux.1 Pro', 'ControlNet', 'Blender Cycles'],
          loras: ['Ladakh Dust Scatter', 'Matte Finish v2'],
          audio: 'EV Motor Hum + Gravel Foley',
          clearToAir: true,
          seedLock: '5521908471',
          tokens: ['Pangong Lake', 'electric 4x4', 'LED lightbar', 'Himalayan sunset']
        }
      }
    ]
  },
  {
    id: 'kabir-varma',
    name: 'Kabir Varma',
    handle: '@kabir_reels',
    title: 'Viral IPL & Gen-Z Short-Form AI Animator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    location: 'Delhi NCR / Gurugram',
    bio: 'High-tempo AI motion specialist engineering viral 9:16 Instagram Reels and YouTube Shorts for Indian brands (Swiggy, Zomato, BoAt, Dream11). Producing cricket match-hype visuals, fast whip-pans, and ElevenLabs Hinglish audio pacing.',
    rating: 4.94,
    reviewsCount: 58,
    hourlyRate: 11000,
    projectMinimum: 180000,
    turnaround: '24h Rush',
    turnaroundBadge: '⚡ 24h Rush Available',
    clearToAirCertified: true,
    benchmarkScore: '98.1%',
    characterConsistencyIndex: 92,
    specializations: ['Motion Graphics', 'AI Filmmaking', '3D & VFX'],
    primaryTools: ['Runway Gen-3', 'ElevenLabs', 'Sora', 'ComfyUI', 'Kling 1.5'],
    verificationTier: 'Verified Pipeline',
    c2paProvenanceReady: true,
    commercialTier: 'ASCI Compliant Social Buyout',
    stats: {
      completedBriefs: 84,
      repeatClients: '89%',
      averageDeliveryDays: 1.6,
      totalFramesGenerated: '3.6M+'
    },
    featuredRecipe: {
      title: 'Super Sixer: Viral IPL Stadium Kinetic Shorts',
      thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
      aspectRatio: '9:16 Vertical Instagram Reels',
      resolution: '1080x1920 60fps Ultra Smooth',
      baseModels: ['Runway Gen-3 Alpha Turbo', 'Sora Kinetic Preview', 'ComfyUI RIFE'],
      loraStack: [
        { name: 'IPL Floodlight Flare & Laser Show LoRA', weight: 0.85, source: 'Stadium Light Library' },
        { name: 'High-Speed Cricket Ball Motion Blur LoRA', weight: 0.70, source: 'Sports VFX Lab' }
      ],
      audioPipeline: 'ElevenLabs Hinglish high-energy commentary + stadium crowd roar & dhol beats',
      commercialClearance: {
        clearToAir: true,
        licenseTier: 'Digital Social Enterprise Tier • ASCI Compliant',
        c2paHash: 'c2pa:sha256:7c8192a9108b981273948572810a019e',
        trainingConsent: 'Certified non-toxic commercial synthetic model stack'
      },
      promptArchitecture: {
        positiveSnippet: 'first-person POV running into roaring Wankhede stadium under blazing floodlights, batter smashing a flaming cricket ball into night sky, kinetic camera whip-pan into fireworks exploding over Mumbai skyline, 60fps fluid sports animation',
        negativeSnippet: 'static camera, sluggish motion, deformed cricket bat, low bitrate blur',
        cameraSettings: 'GoPro 12mm ultra-wide f/2.8, gyro stabilization simulation, 60fps',
        seedLock: '3029184716',
        cfgScale: 8.0,
        sampler: 'Runway Motion Brush Vector Speed 8.8'
      }
    },
    portfolio: [
      {
        id: 'kv-work-1',
        title: 'Super Sixer: Viral IPL Stadium Kinetic Shorts',
        type: 'Viral Vertical Video',
        duration: '0:15',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
        tags: ['Runway Gen-3', 'ElevenLabs', '9:16 Vertical'],
        views: '62.4k',
        awards: '🔥 22M+ Organic Views',
        recipe: {
          baseModels: ['Runway Gen-3 Turbo', 'ComfyUI RIFE', 'ElevenLabs Turbo'],
          loras: ['Stadium Floodlight LoRA', 'Ball Motion Blur'],
          audio: 'ElevenLabs Hinglish Commentary + Dhol Beats',
          clearToAir: true,
          seedLock: '3029184716',
          tokens: ['first-person POV', 'Wankhede stadium', 'fireworks', '60fps motion']
        }
      }
    ]
  },
  {
    id: 'meera-nambiar',
    name: 'Meera Nambiar',
    handle: '@meera_worlds',
    title: 'Mythological & Architectural Worldbuilding Artist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    location: 'Kochi / Varanasi',
    bio: 'Synthesizing ancient Indian temple geometry, Chola bronze aesthetics, and Unreal Engine 5 Lumen architectural visualization. Creating immersive mythological fantasy worlds and futuristic biophilic Indian metropolises for gaming studios and tourism boards.',
    rating: 4.97,
    reviewsCount: 39,
    hourlyRate: 13500,
    projectMinimum: 250000,
    turnaround: 'Enterprise',
    turnaroundBadge: '🏛️ Enterprise Worldbuilder',
    clearToAirCertified: true,
    benchmarkScore: '98.8%',
    characterConsistencyIndex: 94,
    specializations: ['3D & VFX', 'AI Filmmaking', 'Worldbuilding'],
    primaryTools: ['ComfyUI', 'SDXL', 'Unreal Engine 5', 'Flux.1'],
    verificationTier: 'Benchmark Tested',
    c2paProvenanceReady: true,
    commercialTier: 'Full Cultural IP Indemnity',
    stats: {
      completedBriefs: 48,
      repeatClients: '92%',
      averageDeliveryDays: 4.8,
      totalFramesGenerated: '2.4M+'
    },
    featuredRecipe: {
      title: 'Vijayanagara 2100: Dravidian Solarpunk Metropolis',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      aspectRatio: '16:9 Cinematic Epic',
      resolution: '4K Ultra-Wide Master',
      baseModels: ['ComfyUI SDXL Fine-tune', 'Unreal Engine 5.4 Lumen Pass', 'Flux.1 Pro'],
      loraStack: [
        { name: 'Hampi Dravidian Gopuram Granite LoRA', weight: 0.88, source: 'Archaeological Survey 3D Scan' },
        { name: 'Solar Canopy & Tropical Lotus Pond LoRA', weight: 0.72, source: 'Biophilic Design Lab' }
      ],
      audioPipeline: 'Mridangam and bamboo flute soundscape layered with serene river caustics',
      commercialClearance: {
        clearToAir: true,
        licenseTier: 'Enterprise Master Rights • ASCI Cleared',
        c2paHash: 'c2pa:sha256:6e71928374aef5019283746e810a9128',
        trainingConsent: 'Custom trained on licensed heritage architecture'
      },
      promptArchitecture: {
        positiveSnippet: 'sweeping aerial drone shot over a massive solarpunk city built from carved monolithic black granite and floating golden lotus solar panels, waterfalls cascading into sacred temple tanks, glowing bioluminescent frangipani trees, soft morning sunrise over Tungabhadra river, 8k render fidelity',
        negativeSnippet: 'unrealistic structural balance, muddy foliage, pixel noise, western architecture elements',
        cameraSettings: 'DJI Inspire 3 sim, 24mm wide angle, slow elevation tracking',
        seedLock: '4819204721',
        cfgScale: 6.5,
        sampler: 'Euler Ancestral with DPM++ 3M SDE Karras, 50 steps'
      }
    },
    portfolio: [
      {
        id: 'mn-work-1',
        title: 'Vijayanagara 2100: Dravidian Solarpunk Metropolis',
        type: 'Worldbuilding Flythrough',
        duration: '0:50',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
        tags: ['SDXL', 'Unreal Engine', 'ComfyUI', 'Clear-to-Air™'],
        views: '31.2k',
        awards: 'Architectural Digest Future Cities Award',
        recipe: {
          baseModels: ['ComfyUI SDXL', 'Unreal Engine 5', 'Flux.1'],
          loras: ['Granite Gopuram LoRA', 'Lotus Canopy LoRA'],
          audio: 'Mridangam + River Ambience',
          clearToAir: true,
          seedLock: '4819204721',
          tokens: ['monolithic granite', 'solar panels', 'Tungabhadra river', 'morning sunrise']
        }
      }
    ]
  },
  {
    id: 'pooja-hegde-sen',
    name: 'Pooja Hegde-Sen',
    handle: '@pooja_photoreal',
    title: 'Photoreal Brand Campaigner & Clear-to-Air™ ASCI Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    location: 'Hyderabad / Mumbai',
    bio: 'Pioneer of Clear-to-Air™ certified generative production for Fortune 500 Indian brands (Nykaa, Forest Essentials, Tata CliQ Luxury). Specializing in enterprise-safe model pipelines using Adobe Firefly Enterprise, Topaz 8K upscaling, and ASCI synthetic disclosure compliance.',
    rating: 4.99,
    reviewsCount: 76,
    hourlyRate: 18000,
    projectMinimum: 400000,
    turnaround: 'Enterprise',
    turnaroundBadge: '🛡️ 100% ASCI Indemnified Clear-to-Air',
    clearToAirCertified: true,
    benchmarkScore: '99.8%',
    characterConsistencyIndex: 97,
    specializations: ['Fashion/Product', 'Character Consistency', 'AI Filmmaking'],
    primaryTools: ['Adobe Firefly', 'Topaz 4K', 'Flux.1', 'Midjourney v6.1'],
    verificationTier: 'Commercial Safety Certified',
    c2paProvenanceReady: true,
    commercialTier: 'Full Corporate IP Indemnity (Enterprise Grade A++)',
    stats: {
      completedBriefs: 91,
      repeatClients: '98%',
      averageDeliveryDays: 3.5,
      totalFramesGenerated: '3.1M+'
    },
    featuredRecipe: {
      title: 'Forest Essentials: Himalayan Kumkumadi Saffron Dew 8K Master',
      thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      aspectRatio: '1:1 Square & 16:9 Billboard Dual',
      resolution: '8K Print Master (7680x7680)',
      baseModels: ['Adobe Firefly Image 3 Enterprise', 'Topaz Gigapixel AI 8K', 'Custom Commercially-Trained Skin Checkpoint'],
      loraStack: [
        { name: 'Melanin-Rich Skin Micro-Texture LoRA (100% Licensed)', weight: 0.85, source: 'Proprietary Clean Lab' },
        { name: 'Kashmir Saffron Petal Dewdrop Caustics LoRA', weight: 0.75, source: 'Clean Commercial Set' }
      ],
      audioPipeline: 'Ultra-crisp ayurvedic bottle glass clink and golden oil droplet foley with natural room tone',
      commercialClearance: {
        clearToAir: true,
        licenseTier: 'Adobe Enterprise Indemnified + C2PA Full Provenance • ASCI Cleared',
        c2paHash: 'c2pa:sha256:1a829f02938475610293847561029384',
        trainingConsent: 'Zero copyrighted scraping; 100% commercially compensated contributor pool'
      },
      promptArchitecture: {
        positiveSnippet: 'macro commercial beauty portrait of Indian woman with radiant warm olive skin, dewy droplet of saffron facial oil resting on cheekbone reflecting soft golden hour studio light, natural fine skin pores, genuine warm smile, pure cream linen background, Vogue India print cover fidelity',
        negativeSnippet: 'airbrushed fake blur, plastic white-washed skin, unnatural texture, digital noise',
        cameraSettings: 'Phase One IQ4 150MP, Schneider Kreuznach 120mm f/4 Macro, ISO 50',
        seedLock: '2847192039',
        cfgScale: 5.2,
        sampler: 'Firefly Enterprise Diffusion Sampler v3.4'
      }
    },
    portfolio: [
      {
        id: 'phs-work-1',
        title: 'Forest Essentials: Himalayan Kumkumadi Saffron Dew 8K Master',
        type: 'Commercial Beauty Print & Digital',
        duration: '16 Stills Multi-Ratio',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
        tags: ['Adobe Firefly', 'Topaz 8K', 'Clear-to-Air™ Verified'],
        views: '48.6k',
        awards: '🌟 ASCI Compliance Excellence 2026',
        recipe: {
          baseModels: ['Adobe Firefly Enterprise', 'Topaz Gigapixel 8K'],
          loras: ['Olive Skin Texture LoRA', 'Saffron Oil Refraction'],
          audio: 'Glass Drop Foley',
          clearToAir: true,
          seedLock: '2847192039',
          tokens: ['macro skin pores', 'dewy saffron oil', '150MP Phase One', '100% indemnified']
        }
      }
    ]
  }
];

export const INITIAL_BRIEFS = [
  {
    id: 'brief-ind-101',
    title: 'Tanishq Rivaah: Royal Kundan Bridal Jewellery Global Campaign',
    brand: 'Titan Company (Tanishq)',
    brandLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    budget: '₹12,50,000',
    status: 'Open for Pitches',
    deadline: '6 Days',
    specialization: 'Character Consistency',
    mediaType: 'Cinematic Video (45s Master & 15s Cutdowns)',
    aspectRatio: '16:9 Cinema & 9:16 Vertical Dual',
    resolution: '4K ProRes Master',
    requiredTools: ['Kling 1.5', 'ComfyUI', 'Midjourney v6.1', 'Topaz 4K'],
    complianceTier: 'ASCI Synthetic Disclosure • Clear-to-Air™ Certified (Full IP Indemnity)',
    description: 'We require a breathtaking, high-heritage visual commercial for our marquee wedding jewellery collection "Rivaah". Must feature seamless multi-shot actor consistency walking through Udaipur and Jaipur royal courtyards with real 22k gold filigree caustics and uncut polki reflections. Zero facial drift permitted.',
    styleTokens: ['Kundan polki caustics', '22k gold filigree', 'Udaipur marble courtyard', 'crimson Kanjeevaram silk', '24fps filmic cadence'],
    licenseTier: 'Enterprise Commercial Worldwide Buyout (All Media)',
    proposalsCount: 8,
    tags: ['Tanishq', 'Clear-to-Air™', 'Character Consistency 98%', 'Heritage Gold']
  },
  {
    id: 'brief-ind-102',
    title: 'Mahindra Thar EV: Cyber-Ladakh Cinematic Reveal',
    brand: 'Mahindra & Mahindra Electric',
    brandLogo: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=120&q=80',
    budget: '₹15,00,000',
    status: 'In Milestone Review',
    deadline: '4 Days',
    specialization: '3D & VFX',
    mediaType: 'High-Energy CGI Reveal & Social Teasers',
    aspectRatio: '16:9 4K & 1:1 Social',
    resolution: '4K DCI (60fps Motion)',
    requiredTools: ['Flux.1', 'ControlNet', 'Blender', 'Runway Gen-3'],
    complianceTier: 'Commercial Safe (C2PA Signed)',
    description: 'CAD-accurate aerodynamic passes over a prototype electric Thar traversing frozen saline crusts of Pangong Lake at twilight. Seeking photorealistic particle simulation, tire smoke rooster tails, and ultra-dynamic chase camera choreographies.',
    styleTokens: ['matte khaki chassis', 'Pangong Lake saline dust', 'Himalayan sunset', 'octane lighting', 'drone chase cam'],
    licenseTier: 'Digital & Broadcast 2-Year Global Buyout',
    proposalsCount: 11,
    tags: ['Mahindra', 'Automotive 3D', 'Flux.1', 'Ladakh']
  },
  {
    id: 'brief-ind-103',
    title: 'CRED: 90s Bollywood Neo-Noir Action Campaign',
    brand: 'CRED Creative Lab',
    brandLogo: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=120&q=80',
    budget: '₹7,50,000',
    status: 'Open for Pitches',
    deadline: '48h Rush',
    specialization: 'AI Filmmaking',
    mediaType: 'Motion Campaign (30s TVC + 15s Shorts)',
    aspectRatio: '16:9 & 9:16 Vertical',
    resolution: '4K ProRes Master',
    requiredTools: ['Kling 1.5', 'ComfyUI', 'Runway Gen-3', 'ElevenLabs'],
    complianceTier: 'Clear-to-Air™ Verified',
    description: 'Stylized 90s retro action thriller aesthetic set in midnight Mumbai rains. Fast whip-pan camera moves, yellow premier padmini taxis, neon signage reflections, and dramatic vintage voiceover pacing.',
    styleTokens: ['35mm film grain', 'Mumbai monsoon asphalt', 'yellow taxi chase', 'anamorphic flare', 'retro synth foley'],
    licenseTier: 'Digital & OTT 1-Year Buyout',
    proposalsCount: 9,
    tags: ['CRED', '24h Rush', 'AI Cinema', 'Mumbai Noir']
  },
  {
    id: 'brief-ind-104',
    title: 'Forest Essentials: Himalayan Kumkumadi Saffron Dew',
    brand: 'Forest Essentials Luxury Ayurveda',
    brandLogo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=120&q=80',
    budget: '₹9,80,000',
    status: 'Open for Pitches',
    deadline: '5 Days',
    specialization: 'Fashion/Product',
    mediaType: '8K Print Master Stills + Micro-Animation',
    aspectRatio: '1:1 Square & 16:9 Billboard Dual',
    resolution: '8K Master Print (7680x7680)',
    requiredTools: ['Adobe Firefly', 'Topaz 4K', 'Flux.1'],
    complianceTier: 'ASCI Synthetic Certified • 100% Indemnified',
    description: 'Ultra-photorealistic commercial macro beauty campaign showcasing Kashmiri saffron facial oil droplets absorbing into warm melanin-rich skin. Strict requirement for natural skin pores with zero uncanny valley plastic blur.',
    styleTokens: ['macro dewy skin', 'Kashmiri saffron caustics', 'pure linen backdrop', 'golden hour bounce'],
    licenseTier: 'Global Exclusive Buyout Tier 1',
    proposalsCount: 6,
    tags: ['Forest Essentials', 'Ayurveda', 'Photoreal 8K', 'Clear-to-Air™']
  }
];

export const INITIAL_DELIVERY_PROJECTS = [
  {
    id: 'delivery-proj-ind-1',
    briefTitle: 'Tanishq Rivaah: Royal Kundan Bridal Jewellery Global Campaign',
    client: 'Titan Company (Tanishq)',
    creator: 'Aarav Sharma',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    milestoneNumber: 2,
    totalMilestones: 3,
    milestoneTitle: 'Milestone 2: Kundan Gemstone Caustics & Rajputana Courtyard Multi-Shot Continuity',
    escrowAmount: '₹5,50,000 (Escrow Locked in Brivio Protocol)',
    status: 'Ready for Review',
    activeSeedA: {
      seedId: '#7829104821',
      label: 'Seed A (Baseline Prompt v1)',
      model: 'Kling 1.5 Pro + Face LoRA v2.1',
      cfg: 7.0,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      prompt: 'cinematic 35mm anamorphic wide shot of royal bride walking through Udaipur palace courtyard, golden hour light, red bridal lehenga, uncut Kundan jewellery, 24fps motion cadence',
      notes: 'Initial generation with baseline IP-adapter weight 0.72. Slight glow bleeding on gold choker edge.'
    },
    activeSeedB: {
      seedId: '#7829104822',
      label: 'Seed B (Refined Kundan Polki LoRA v3.4 + DaVinci Halation)',
      model: 'Kling 1.5 Pro + Custom Face Lock v2.4 + IP-Adapter Plus (0.94)',
      cfg: 6.8,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      prompt: 'cinematic 35mm anamorphic wide shot of royal bride walking through Udaipur palace courtyard, tight facial anchor geometry, specular highlights on 22k gold filigree and uncut polki diamonds, soft warm sunset backlight, zero gold color bleed on skin, Kodak 5219 film grain, 24fps filmic motion',
      notes: 'Refined prompt architecture with negative token suppression on chromatic bleed and custom face consistency LoRA at 0.94 weight.'
    },
    promptDiff: {
      v1: 'cinematic 35mm anamorphic wide shot of royal bride walking through Udaipur palace courtyard, golden hour light, red bridal lehenga, uncut Kundan jewellery, 24fps motion cadence',
      v2: 'cinematic 35mm anamorphic wide shot of royal bride walking through Udaipur palace courtyard, tight facial anchor geometry, specular highlights on 22k gold filigree and uncut polki diamonds, soft warm sunset backlight, zero gold color bleed on skin, Kodak 5219 film grain, 24fps filmic motion',
      addedTokens: ['tight facial anchor geometry', 'specular highlights on 22k gold filigree and uncut polki diamonds', 'soft warm sunset backlight', 'zero gold color bleed on skin', 'Kodak 5219 film grain'],
      removedTokens: ['golden hour light', 'red bridal lehenga', 'uncut Kundan jewellery']
    },
    feedbackPins: [
      {
        id: 'pin-1',
        x: 48,
        y: 34,
        user: 'Deepika Rao (Creative Director, Tanishq)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        comment: 'The facial anchor is 100% consistent with our brand ambassador moodboard! Great detail on the maang tikka alignment.',
        status: 'Resolved',
        createdAt: '1 hour ago'
      },
      {
        id: 'pin-2',
        x: 68,
        y: 58,
        user: 'Vikramaditya Roy (Brand Guardian, Titan)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        comment: 'Inpainting request: soften the red zari reflections on the marble pillar by 15% so the polki choker silhouette stands out.',
        status: 'Pending Inpaint',
        createdAt: '30 mins ago'
      }
    ],
    history: [
      { version: 'v1.0 (Rough Udaipur Keyframes)', date: '3 days ago', status: 'Approved' },
      { version: 'v2.0 (4K Anamorphic Sequence)', date: 'Yesterday', status: 'Current Review' },
      { version: 'v3.0 (Final ASCI & C2PA Master)', date: 'Upcoming', status: 'Pending Milestone 2 Approval' }
    ]
  },
  {
    id: 'delivery-proj-ind-2',
    briefTitle: 'Mahindra Thar.e: Pangong Tso Extreme Terrain Cinematic Launch',
    client: 'Mahindra & Mahindra Automotive',
    creator: 'Ananya Sen',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    milestoneNumber: 1,
    totalMilestones: 3,
    milestoneTitle: 'Milestone 1: Vehicle Rig Geometry ControlNet & Sand Drift Physics',
    escrowAmount: '₹7,20,000 (Escrow Locked in Brivio Protocol)',
    status: 'Ready for Review',
    activeSeedA: {
      seedId: '#9931820194',
      label: 'Seed A (Baseline ControlNet v1.1)',
      model: 'Runway Gen-3 Alpha + Depth ControlNet',
      cfg: 7.2,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      prompt: 'high-speed tracking shot of electric 4x4 rugged concept vehicle drifting across salt flats of Ladakh, dramatic mountain peaks background, dust particles in sun rays, 60fps slow motion',
      notes: 'Initial generation using Depth ControlNet. Tyre contact shadow floating slightly on uneven gravel.'
    },
    activeSeedB: {
      seedId: '#9931820195',
      label: 'Seed B (Refined Anisotropic Lighting + Wheel Physics LoRA)',
      model: 'Runway Gen-3 Alpha + Custom Thar CAD Mesh LoRA (0.92) + ComfyUI Particle Pass',
      cfg: 6.5,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      prompt: 'high-speed low angle tracking shot of electric 4x4 concept vehicle drifting across Ladakh salt flats, locked CAD chassis geometry, hyper-realistic gravel displacement, Pangong blue lake reflection on hood, golden hour rim lighting, ARRI Alexa LF 65mm anamorphic',
      notes: 'Locked chassis geometry with custom Mahindra Thar LoRA at 0.92 weight and added particle spray displacement pass.'
    },
    promptDiff: {
      v1: 'high-speed tracking shot of electric 4x4 rugged concept vehicle drifting across salt flats of Ladakh, dramatic mountain peaks background, dust particles in sun rays, 60fps slow motion',
      v2: 'high-speed low angle tracking shot of electric 4x4 concept vehicle drifting across Ladakh salt flats, locked CAD chassis geometry, hyper-realistic gravel displacement, Pangong blue lake reflection on hood, golden hour rim lighting, ARRI Alexa LF 65mm anamorphic',
      addedTokens: ['low angle tracking shot', 'locked CAD chassis geometry', 'hyper-realistic gravel displacement', 'Pangong blue lake reflection on hood', 'ARRI Alexa LF 65mm anamorphic'],
      removedTokens: ['60fps slow motion', 'dust particles in sun rays']
    },
    feedbackPins: [
      {
        id: 'pin-m1',
        x: 52,
        y: 62,
        user: 'Tarun Mehta (Brand Lead, Mahindra EV)',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        comment: 'Wheel contact shadow is now completely grounded! The tire tread pattern matches our production prototype perfectly.',
        status: 'Resolved',
        createdAt: '2 hours ago'
      },
      {
        id: 'pin-m2',
        x: 74,
        y: 40,
        user: 'Shalini Verma (Creative Supervisor, Ogilvy India)',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
        comment: 'Inpaint request: brighten the cyan LED signature light on the front grille by 10% so it cuts through the dust haze.',
        status: 'Pending Inpaint',
        createdAt: '45 mins ago'
      }
    ],
    history: [
      { version: 'v1.0 (CAD Wireframe Match)', date: '4 days ago', status: 'Approved' },
      { version: 'v2.0 (Dynamic Particle Pass)', date: 'Today', status: 'Current Review' },
      { version: 'v3.0 (Sound Design Sync & C2PA)', date: 'Upcoming', status: 'Pending Milestone 1 Approval' }
    ]
  },
  {
    id: 'delivery-proj-ind-3',
    briefTitle: 'CRED: 90s Mumbai Monsoon Neo-Noir 30s Commercial',
    client: 'CRED (Dreamplug Technologies)',
    creator: 'Rohan Deshmukh',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    milestoneNumber: 3,
    totalMilestones: 3,
    milestoneTitle: 'Milestone 3: Final ASCI Synthetic Watermark & Neo-Noir Film Halation',
    escrowAmount: '₹3,80,000 (Escrow Locked in Brivio Protocol)',
    status: 'Ready for Review',
    activeSeedA: {
      seedId: '#4419208112',
      label: 'Seed A (Midjourney v6.1 Baseline)',
      model: 'Midjourney v6.1 + Luma Dream Machine',
      cfg: 6.0,
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
      prompt: 'retro 90s cinematic film still, rainy night on Mumbai Marine Drive, vintage premier padmini taxi passing, neon reflection on wet asphalt, Wong Kar-Wai mood, 35mm film grain',
      notes: 'Initial generation with baseline film mood. Neon reflections were slightly over-saturated.'
    },
    activeSeedB: {
      seedId: '#4419208113',
      label: 'Seed B (Refined 90s Bollywood Halation + ASCI Watermark)',
      model: 'Midjourney v6.1 + Custom Neo-Bombay LoRA + ASCI C2PA Node',
      cfg: 5.5,
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      prompt: 'retro 90s cinematic film still, moody monsoon downpour on Mumbai Marine Drive, vintage premier padmini taxi with authentic chrome bumper, soft green and amber neon signage reflected in puddles, Wong Kar-Wai step-printing motion blur, Fuji 500T grain, subtle ASCI synthetic media disclaimer',
      notes: 'Tuned neon color grading with authentic Fuji 500T grain simulation and compliant ASCI synthetic disclosure embedded.'
    },
    promptDiff: {
      v1: 'retro 90s cinematic film still, rainy night on Mumbai Marine Drive, vintage premier padmini taxi passing, neon reflection on wet asphalt, Wong Kar-Wai mood, 35mm film grain',
      v2: 'retro 90s cinematic film still, moody monsoon downpour on Mumbai Marine Drive, vintage premier padmini taxi with authentic chrome bumper, soft green and amber neon signage reflected in puddles, Wong Kar-Wai step-printing motion blur, Fuji 500T grain, subtle ASCI synthetic media disclaimer',
      addedTokens: ['moody monsoon downpour', 'authentic chrome bumper', 'soft green and amber neon signage reflected in puddles', 'step-printing motion blur', 'Fuji 500T grain', 'subtle ASCI synthetic media disclaimer'],
      removedTokens: ['rainy night', 'neon reflection on wet asphalt', '35mm film grain']
    },
    feedbackPins: [
      {
        id: 'pin-c1',
        x: 60,
        y: 45,
        user: 'Kunal Shah (Founder, CRED)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        comment: 'The nostalgic 90s Mumbai aesthetic is spot on! Love the amber neon glow on the vintage taxi hood.',
        status: 'Resolved',
        createdAt: '3 hours ago'
      }
    ],
    history: [
      { version: 'v1.0 (Moodboard & Sound Anchor)', date: '5 days ago', status: 'Approved' },
      { version: 'v2.0 (Monsoon Lighting Pass)', date: '2 days ago', status: 'Approved' },
      { version: 'v3.0 (Final ASCI & C2PA Master)', date: 'Today', status: 'Ready for Escrow Release' }
    ]
  }
];

export const TOOL_OPTIONS = [
  'Kling 1.5',
  'Runway Gen-3',
  'Midjourney v6.1',
  'Flux.1',
  'ComfyUI',
  'ElevenLabs',
  'Sora',
  'Adobe Firefly',
  'Topaz 4K',
  'SDXL'
];

export const SPECIALIZATION_OPTIONS = [
  'AI Filmmaking',
  'Character Consistency',
  '3D & VFX',
  'Fashion/Product',
  'Motion Graphics',
  'Worldbuilding'
];

export const VERIFICATION_OPTIONS = [
  'Enterprise Verified',
  'Commercial Safety Certified',
  'Benchmark Tested'
];

export const TURNAROUND_OPTIONS = [
  '24h Rush',
  'Under 1 Week',
  'Enterprise'
];
