// Mock Data for PrintPro Gráfica Web System
// Delmiro Gouveia - AL

export const INITIAL_SERVICES = [
  {
    id: 1,
    name: 'Cartão de Visita Couché 300g',
    slug: 'cartao-visita-couche-300g',
    category: 'Cartão de Visita',
    description: 'Cartão de visita profissional impresso em papel Couché 300g com acabamento refinado e alta fidelidade de cor.',
    priceFrom: 43.90,
    unit: '500 unidades',
    deliveryDays: 2,
    badge: 'Mais Vendido',
    rating: 4.9,
    reviewCount: 604,
    popular: true,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    requirements: {
      tamanho: {
        label: 'Tamanho / Formato',
        type: 'select',
        options: ['88x48mm (Padrão)', '85x54mm (Cartão de Crédito)', '90x50mm'],
        default: '88x48mm (Padrão)'
      },
      cores: {
        label: 'Cores de Impressão',
        type: 'select',
        options: ['4x0 (Só Frente Colorido)', '4x4 (Frente e Verso Colorido)'],
        default: '4x4 (Frente e Verso Colorido)'
      },
      acabamento: {
        label: 'Enobrecimento e Acabamento',
        type: 'select',
        options: [
          'Verniz Total Brilho Frente',
          'Laminação Fosca Frente e Verso',
          'Laminação Fosca + Verniz Localizado',
          'Cantos Arredondados (4 Cantos)'
        ],
        default: 'Verniz Total Brilho Frente'
      },
      quantidade: {
        label: 'Tiragem / Quantidade',
        type: 'select',
        options: ['100', '250', '500', '1000', '2500', '5000'],
        default: '500'
      },
      uploadArte: {
        label: 'Envio de Arte Gráfica',
        type: 'file',
        required: true,
        formats: ['.pdf', '.cdr', '.ai', '.png', '.jpg'],
        maxSizeMb: 50
      }
    }
  },
  {
    id: 2,
    name: 'Lacre de Segurança & Adesivo Vinil',
    slug: 'lacre-seguranca-adesivo-vinil',
    category: 'Adesivos & Rótulos',
    description: 'Ideal para delivery, alimentos, embalagens e caixas. Garante a integridade do produto e transmite profissionalismo.',
    priceFrom: 29.90,
    unit: '100 unidades',
    deliveryDays: 1,
    badge: 'Destaque Instagram',
    rating: 5.0,
    reviewCount: 312,
    popular: true,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80',
    requirements: {
      tipoVinil: {
        label: 'Tipo de Material',
        type: 'select',
        options: [
          'Vinil Adesivo Branco Brilho',
          'Vinil Adesivo Branco Fosco',
          'Vinil Transparente Cristal',
          'Casca de Ovo (Destrutível / Anti-Violação)'
        ],
        default: 'Vinil Adesivo Branco Brilho'
      },
      formatoCorte: {
        label: 'Tipo de Corte',
        type: 'select',
        options: ['Meio-Corte Redondo', 'Meio-Corte Retangular / Lacre Faixa', 'Corte Especial com Faca Personalizada'],
        default: 'Meio-Corte Retangular / Lacre Faixa'
      },
      dimensoes: {
        label: 'Dimensões (LxA)',
        type: 'select',
        options: ['3x3 cm', '5x5 cm', '10x3 cm (Faixa Lacre)', '8x4 cm', 'Personalizado'],
        default: '10x3 cm (Faixa Lacre)'
      },
      quantidade: {
        label: 'Quantidade',
        type: 'select',
        options: ['50', '100', '250', '500', '1000', '2000'],
        default: '250'
      },
      uploadArte: {
        label: 'Envio do Logotipo / Arte',
        type: 'file',
        required: true,
        formats: ['.pdf', '.cdr', '.ai', '.png', '.jpg'],
        maxSizeMb: 50
      }
    }
  },
  {
    id: 3,
    name: 'Banner em Lona com Acabamento Completo',
    slug: 'banner-lona-com-acabamento',
    category: 'Comunicação Visual',
    description: 'Banner de alta durabilidade para fachadas, feiras, eventos e promoções. Impressão fotográfica de alta resolução.',
    priceFrom: 34.90,
    unit: '1 unidade',
    deliveryDays: 1,
    badge: 'Produção 24h',
    rating: 4.8,
    reviewCount: 189,
    popular: true,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    requirements: {
      largura: {
        label: 'Largura (cm)',
        type: 'number',
        default: '60',
        min: 20,
        max: 300
      },
      altura: {
        label: 'Altura (cm)',
        type: 'number',
        default: '90',
        min: 20,
        max: 500
      },
      material: {
        label: 'Gramatura da Lona',
        type: 'select',
        options: ['Lona Fosca 440g', 'Lona Brilho 440g', 'Lona Reforçada 510g'],
        default: 'Lona Brilho 440g'
      },
      acabamento: {
        label: 'Tipo de Acabamento',
        type: 'select',
        options: [
          'Bastão de Madeira + Cordão Superior',
          'Bainha Reforçada com Ilhós em Toda a Volta',
          'Apenas Ilhós nos 4 Cantos',
          'Refile Reto Sem Acabamento'
        ],
        default: 'Bastão de Madeira + Cordão Superior'
      },
      quantidade: {
        label: 'Quantidade de Peças',
        type: 'select',
        options: ['1', '2', '3', '5', '10'],
        default: '1'
      },
      uploadArte: {
        label: 'Arquivo do Banner',
        type: 'file',
        required: true,
        formats: ['.pdf', '.cdr', '.ai', '.tiff', '.jpg'],
        maxSizeMb: 100
      }
    }
  },
  {
    id: 4,
    name: 'Copos Personalizados & Brindes Exclusivos',
    slug: 'copos-personalizados-brindes',
    category: 'Brindes & Copos',
    description: 'Copo Long Drink, Taças e Twister para eventos, aniversários e empresas. Destaque no Instagram da PrintPro!',
    priceFrom: 2.80,
    unit: 'por unidade (mín. 30)',
    deliveryDays: 3,
    badge: 'Tendência',
    rating: 4.95,
    reviewCount: 420,
    popular: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    requirements: {
      modelo: {
        label: 'Modelo do Brinde',
        type: 'select',
        options: [
          'Copo Long Drink 350ml',
          'Taça Gin 580ml',
          'Copo Twister com Tampa e Canudo 500ml',
          'Caneca de Chopp Acrílica 500ml'
        ],
        default: 'Copo Long Drink 350ml'
      },
      corCopo: {
        label: 'Cor / Estilo do Copo',
        type: 'select',
        options: [
          'Branco Leitoso',
          'Transparente Cristal',
          'Degradê Neon (Azul Cyan / Rosa)',
          'Degradê Dourado / Amarelo',
          'Preto Sólido / Black Piano'
        ],
        default: 'Degradê Neon (Azul Cyan / Rosa)'
      },
      tipoPersonalizacao: {
        label: 'Tecnologia de Impressão',
        type: 'select',
        options: [
          'Silk-Screen 1 Cor',
          'Transfer Laser Colorido Full Color',
          'DTF UV Relevo Ultra HD'
        ],
        default: 'Transfer Laser Colorido Full Color'
      },
      quantidade: {
        label: 'Quantidade (Tiragem)',
        type: 'select',
        options: ['30', '50', '100', '200', '500'],
        default: '50'
      },
      uploadArte: {
        label: 'Sua Arte / Logo / Nomes',
        type: 'file',
        required: true,
        formats: ['.pdf', '.cdr', '.ai', '.png', '.jpg'],
        maxSizeMb: 50
      }
    }
  },
  {
    id: 5,
    name: 'Folhetos e Panfletos Couché 115g',
    slug: 'folhetos-panfletos-couche-115g',
    category: 'Folhetos',
    description: 'Divulgue promoções, cardápios e inaugurações com excelente custo-benefício e impressão nítida.',
    priceFrom: 69.90,
    unit: '1.000 unidades',
    deliveryDays: 2,
    badge: 'Econômico',
    rating: 4.85,
    reviewCount: 240,
    popular: true,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    requirements: {
      formato: {
        label: 'Tamanho do Folheto',
        type: 'select',
        options: ['10x14 cm (1/4 A4)', '14x20 cm (1/2 A4)', '20x28 cm (A4)', 'Folder 2 Dobras (14x20cm fechado)'],
        default: '10x14 cm (1/4 A4)'
      },
      cores: {
        label: 'Cores',
        type: 'select',
        options: ['4x0 (Colorido Frente)', '4x4 (Colorido Frente e Verso)'],
        default: '4x0 (Colorido Frente)'
      },
      quantidade: {
        label: 'Quantidade',
        type: 'select',
        options: ['500', '1000', '2500', '5000', '10000'],
        default: '1000'
      },
      uploadArte: {
        label: 'Arquivo do Panfleto',
        type: 'file',
        required: true,
        formats: ['.pdf', '.cdr', '.ai', '.png', '.jpg'],
        maxSizeMb: 50
      }
    }
  },
  {
    id: 6,
    name: 'Wind Banner Kit Completo (Haste + Base)',
    slug: 'wind-banner-kit-completo',
    category: 'Comunicação Visual',
    description: 'Chame atenção na entrada da sua loja em Delmiro Gouveia com Wind Banner resistente ao vento.',
    priceFrom: 149.90,
    unit: '1 kit completo',
    deliveryDays: 2,
    badge: 'Super Destaque',
    rating: 5.0,
    reviewCount: 98,
    popular: true,
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=600&q=80',
    requirements: {
      formatoFaca: {
        label: 'Modelo do Formato',
        type: 'select',
        options: ['Modelo Faca', 'Modelo Pena / Feather', 'Modelo Gota'],
        default: 'Modelo Faca'
      },
      tamanho: {
        label: 'Tamanho Montado',
        type: 'select',
        options: ['P - 2,20m de Altura', 'M - 3,10m de Altura', 'G - 4,20m de Altura'],
        default: 'P - 2,20m de Altura'
      },
      tecido: {
        label: 'Impressão no Tecido',
        type: 'select',
        options: ['Sublimação Dupla-Face 4x4 (Costurado)', 'Sublimação Face Única 4x0'],
        default: 'Sublimação Dupla-Face 4x4 (Costurado)'
      },
      base: {
        label: 'Tipo de Base',
        type: 'select',
        options: ['Base Plástica Preta de 18L (Água/Areia)', 'Base Cruzada em Aço com Bóia d\'Água'],
        default: 'Base Plástica Preta de 18L (Água/Areia)'
      },
      quantidade: {
        label: 'Quantidade',
        type: 'select',
        options: ['1', '2', '3', '5'],
        default: '1'
      },
      uploadArte: {
        label: 'Arquivo de Arte',
        type: 'file',
        required: true,
        formats: ['.pdf', '.cdr', '.ai'],
        maxSizeMb: 100
      }
    }
  },
  {
    id: 7,
    name: 'Pasta Corporativa com Orelha ou Bolsa',
    slug: 'pasta-corporativa-com-bolsa',
    category: 'Papelaria Corporativa',
    description: 'Pastas personalizadas para contratos, propostas comerciais e exames. Acabamento de primeira linha.',
    priceFrom: 97.90,
    unit: '10 unidades',
    deliveryDays: 3,
    badge: 'Corporativo',
    rating: 4.9,
    reviewCount: 45,
    popular: false,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    requirements: {
      tipoBolsa: {
        label: 'Modelo da Pasta',
        type: 'select',
        options: ['Pasta com Orelha e Encaixe', 'Pasta com Bolsa Colada e Porta-Cartão'],
        default: 'Pasta com Orelha e Encaixe'
      },
      papel: {
        label: 'Papel',
        type: 'select',
        options: ['Couché Brilho 250g', 'Couché Fosco 300g', 'Supremo 300g'],
        default: 'Couché Brilho 250g'
      },
      acabamento: {
        label: 'Acabamento',
        type: 'select',
        options: ['Verniz Total Brilho Frente', 'Laminação Fosca', 'Laminação Fosca + Verniz Localizado'],
        default: 'Verniz Total Brilho Frente'
      },
      quantidade: {
        label: 'Quantidade',
        type: 'select',
        options: ['10', '25', '50', '100', '250', '500'],
        default: '50'
      },
      uploadArte: {
        label: 'Arquivo da Pasta',
        type: 'file',
        required: true,
        formats: ['.pdf', '.cdr', '.ai'],
        maxSizeMb: 80
      }
    }
  },
  {
    id: 8,
    name: 'Crachás e Credenciais em PVC com Cordão',
    slug: 'crachas-credenciais-pvc',
    category: 'Identificação & PVC',
    description: 'Crachás rígidos em PVC 0.76mm alta resolução com cantos arredondados e cordão personalizado.',
    priceFrom: 12.50,
    unit: 'por unidade',
    deliveryDays: 2,
    badge: 'Identificação',
    rating: 4.9,
    reviewCount: 88,
    popular: false,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    requirements: {
      cordao: {
        label: 'Acompanhamento do Cordão',
        type: 'select',
        options: ['Cordão Liso Preto com Presilha Jacaré', 'Cordão Sublimado Personalizado 15mm', 'Sem Cordão (Apenas Crachá)'],
        default: 'Cordão Liso Preto com Presilha Jacaré'
      },
      furacao: {
        label: 'Tipo de Furação',
        type: 'select',
        options: ['Furo Ovoide Superior', 'Furo Redondo', 'Sem Furação (Bolsa Plástica)'],
        default: 'Furo Ovoide Superior'
      },
      quantidade: {
        label: 'Quantidade de Crachás',
        type: 'select',
        options: ['5', '10', '20', '50', '100'],
        default: '10'
      },
      uploadArte: {
        label: 'Arte ou Fotos / Dados',
        type: 'file',
        required: true,
        formats: ['.pdf', '.cdr', '.ai', '.zip'],
        maxSizeMb: 50
      }
    }
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'PRP-1042',
    clientName: 'Carlos Eduardo Santos',
    clientCompany: 'Hamburgueria Delmiro Gourmet',
    clientEmail: 'carlos@hamburgueriadelmiro.com.br',
    clientPhone: '(82) 98845-1290',
    serviceId: 3,
    serviceName: 'Banner em Lona com Acabamento Completo',
    createdAt: '2026-10-05T14:30:00Z',
    status: 'AGUARDANDO_CORRECAO', // KEY TEST CASE: Cliente needs to fix art
    deadline: '2026-10-09',
    totalValue: 69.80,
    specs: {
      largura: '80 cm',
      altura: '120 cm',
      material: 'Lona Brilho 440g',
      acabamento: 'Bastão de Madeira + Cordão Superior',
      quantidade: '2 peças'
    },
    observations: 'Favor caprichar nas cores dos lanches para chamar atenção na calçada.',
    quotation: {
      materialCost: 28.00,
      printCost: 18.00,
      finishingCost: 9.80,
      markup: 14.00,
      total: 69.80,
      status: 'Aprovado pelo cliente'
    },
    artVersions: [
      {
        version: 1,
        filename: 'banner_inauguracao_draft_72dpi.jpg',
        fileSize: '1.4 MB',
        uploadedAt: '2026-10-05T14:32:00Z',
        status: 'REPROVADA',
        reviewedBy: 'Lucas Ferreira (Pré-Impressão)',
        reviewDate: '2026-10-05T16:15:00Z',
        rejectionReason: 'Resolução Baixa (< 150 DPI) e Sem Sangria',
        correctionNote: 'O arquivo enviado está em 72 DPI (pixelado para impressão em 80x120cm) e não possui sangria de 15mm para o acabamento do bastão. O texto do rodapé "Entregas pelo WhatsApp" está muito rente à borda inferior e será cortado.'
      }
    ],
    timeline: [
      { step: 'Pedido Criado', date: '05/10/2026 14:30', author: 'Carlos Eduardo', done: true },
      { step: 'Arte v1 Enviada', date: '05/10/2026 14:32', author: 'Carlos Eduardo', done: true },
      { step: 'Análise Técnica de Pré-Impressão', date: '05/10/2026 16:15', author: 'Lucas Ferreira', done: true },
      { step: 'Correção Solicitada', date: '05/10/2026 16:18', author: 'Lucas Ferreira', done: true, alert: true },
      { step: 'Aguardando Reenvio do Cliente', date: 'Em aberto', author: 'Sistema', done: false, active: true },
      { step: 'Aprovação Final da Arte', date: 'Pendente', author: 'Operador', done: false },
      { step: 'Produção / Impressão', date: 'Pendente', author: 'Produção', done: false },
      { step: 'Finalizado / Disponível para Retirada', date: 'Pendente', author: 'Expedição', done: false }
    ]
  },
  {
    id: 'PRP-1043',
    clientName: 'Dra. Mariana Costa',
    clientCompany: 'Advocacia Costa & Associados',
    clientEmail: 'mariana@costaadvocacia.com.br',
    clientPhone: '(82) 99123-4567',
    serviceId: 1,
    serviceName: 'Cartão de Visita Couché 300g',
    createdAt: '2026-10-06T09:15:00Z',
    status: 'EM_ANALISE', // KEY TEST CASE: Responsável needs to review art & preflight
    deadline: '2026-10-08',
    totalValue: 88.90,
    specs: {
      tamanho: '88x48mm (Padrão)',
      cores: '4x4 (Frente e Verso Colorido)',
      acabamento: 'Laminação Fosca + Verniz Localizado',
      quantidade: '1.000 unidades'
    },
    observations: 'Máscara de verniz localizado incluída na página 3 do PDF.',
    quotation: {
      materialCost: 32.00,
      printCost: 24.00,
      finishingCost: 18.90,
      markup: 14.00,
      total: 88.90,
      status: 'Aguardando confirmação técnica'
    },
    artVersions: [
      {
        version: 1,
        filename: 'cartao_advocacia_costa_fechado_cmyk.pdf',
        fileSize: '8.7 MB',
        uploadedAt: '2026-10-06T09:18:00Z',
        status: 'EM_ANALISE',
        technicalDetails: {
          format: 'PDF/X-1a:2001',
          colorSpace: 'CMYK (FOGRA39)',
          dimensionsMm: '91 x 51 mm (com 1.5mm de sangria)',
          dpi: '350 DPI',
          fontsEmbedded: 'Sim (Convertidas em curvas)'
        }
      }
    ],
    timeline: [
      { step: 'Pedido Criado', date: '06/10/2026 09:15', author: 'Dra. Mariana Costa', done: true },
      { step: 'Arte v1 Enviada', date: '06/10/2026 09:18', author: 'Dra. Mariana Costa', done: true },
      { step: 'Em Análise de Pré-Impressão', date: '06/10/2026 09:20', author: 'Lucas Ferreira', done: true, active: true },
      { step: 'Aprovação Final da Arte', date: 'Pendente', author: 'Lucas Ferreira', done: false },
      { step: 'Liberação para Produção', date: 'Pendente', author: 'Responsável', done: false },
      { step: 'Finalizado', date: 'Pendente', author: 'Expedição', done: false }
    ]
  },
  {
    id: 'PRP-1044',
    clientName: 'Beatriz Lima',
    clientCompany: 'Beatriz Lima Eventos & Cerimonial',
    clientEmail: 'beatriz@limacerimonial.com',
    clientPhone: '(82) 99654-7890',
    serviceId: 4,
    serviceName: 'Copos Personalizados & Brindes Exclusivos',
    createdAt: '2026-10-06T10:00:00Z',
    status: 'APROVADO', // KEY TEST CASE: Ready to be "Liberado para Produção"
    deadline: '2026-10-10',
    totalValue: 265.00,
    specs: {
      modelo: 'Copo Long Drink 350ml',
      corCopo: 'Degradê Neon (Azul Cyan / Rosa)',
      tipoPersonalizacao: 'Transfer Laser Colorido Full Color',
      quantidade: '100 unidades'
    },
    observations: 'Formatura Medicina Veterinária - Turma 2026.',
    quotation: {
      materialCost: 110.00,
      printCost: 85.00,
      finishingCost: 20.00,
      markup: 50.00,
      total: 265.00,
      status: 'Aprovado e Pago via PIX'
    },
    artVersions: [
      {
        version: 1,
        filename: 'logo_formatura_vet_curvas.pdf',
        fileSize: '4.2 MB',
        uploadedAt: '2026-10-06T10:05:00Z',
        status: 'APROVADA',
        reviewedBy: 'Lucas Ferreira (Pré-Impressão)',
        reviewDate: '2026-10-06T11:00:00Z',
        approvalNote: 'Arquivo em vetor perfeito, medidas de transfer 12x7cm conferidas e cores CMYK validadas.'
      }
    ],
    timeline: [
      { step: 'Pedido Criado', date: '06/10/2026 10:00', author: 'Beatriz Lima', done: true },
      { step: 'Arte v1 Enviada', date: '06/10/2026 10:05', author: 'Beatriz Lima', done: true },
      { step: 'Arte Analisada e Aprovada', date: '06/10/2026 11:00', author: 'Lucas Ferreira', done: true },
      { step: 'Aguardando Liberação para Produção', date: '06/10/2026 11:05', author: 'Responsável', done: true, active: true },
      { step: 'Em Produção', date: 'Pendente', author: 'Oficina de Brindes', done: false },
      { step: 'Finalizado', date: 'Pendente', author: 'Expedição', done: false }
    ]
  },
  {
    id: 'PRP-1045',
    clientName: 'Roberto Alencar',
    clientCompany: 'Ponto da Pizza Delmiro Gouveia',
    clientEmail: 'contato@pontodapizzadg.com.br',
    clientPhone: '(82) 98711-2233',
    serviceId: 2,
    serviceName: 'Lacre de Segurança & Adesivo Vinil',
    createdAt: '2026-10-04T16:00:00Z',
    status: 'EM_PRODUCAO', // KEY TEST CASE: In production stages
    deadline: '2026-10-07',
    totalValue: 94.50,
    productionStage: 'Corte e Acabamento', // Impressão -> Corte e Acabamento -> Controle de Qualidade
    specs: {
      tipoVinil: 'Vinil Adesivo Branco Brilho',
      formatoCorte: 'Meio-Corte Retangular / Lacre Faixa',
      dimensoes: '10x3 cm (Faixa Lacre)',
      quantidade: '500 unidades'
    },
    observations: 'Lacre com picote central anti-violação.',
    quotation: {
      materialCost: 35.00,
      printCost: 28.00,
      finishingCost: 15.50,
      markup: 16.00,
      total: 94.50,
      status: 'Aprovado'
    },
    artVersions: [
      {
        version: 1,
        filename: 'lacre_pizza_seguranca_v1.pdf',
        fileSize: '3.1 MB',
        uploadedAt: '2026-10-04T16:05:00Z',
        status: 'APROVADA',
        reviewedBy: 'Lucas Ferreira',
        reviewDate: '2026-10-04T17:00:00Z'
      }
    ],
    timeline: [
      { step: 'Pedido Criado', date: '04/10/2026 16:00', author: 'Roberto Alencar', done: true },
      { step: 'Arte Aprovada', date: '04/10/2026 17:00', author: 'Lucas Ferreira', done: true },
      { step: 'Liberado para Produção', date: '05/10/2026 08:30', author: 'Lucas Ferreira', done: true },
      { step: 'Em Produção (Corte e Acabamento)', date: '06/10/2026 10:00', author: 'Equipe Comunicação Visual', done: true, active: true },
      { step: 'Finalizado para Retirada', date: 'Previsto: 07/10', author: 'Balcão', done: false }
    ]
  },
  {
    id: 'PRP-1046',
    clientName: 'Juliana Marinho',
    clientCompany: 'Iron Fitness Academia DG',
    clientEmail: 'juliana@ironfitnessdg.com.br',
    clientPhone: '(82) 99344-5566',
    serviceId: 6,
    serviceName: 'Wind Banner Kit Completo (Haste + Base)',
    createdAt: '2026-10-02T11:00:00Z',
    status: 'FINALIZADO',
    deadline: '2026-10-05',
    totalValue: 310.00,
    specs: {
      formatoFaca: 'Modelo Faca',
      tamanho: 'P - 2,20m de Altura',
      tecido: 'Sublimação Dupla-Face 4x4 (Costurado)',
      base: 'Base Plástica Preta de 18L (Água/Areia)',
      quantidade: '2 kits'
    },
    observations: 'Retirada no balcão de Delmiro Gouveia.',
    quotation: {
      materialCost: 140.00,
      printCost: 90.00,
      finishingCost: 40.00,
      markup: 40.00,
      total: 310.00,
      status: 'Concluído e Entregue'
    },
    artVersions: [
      {
        version: 1,
        filename: 'wind_banner_iron_fitness.pdf',
        fileSize: '15.4 MB',
        uploadedAt: '2026-10-02T11:10:00Z',
        status: 'APROVADA',
        reviewedBy: 'Lucas Ferreira',
        reviewDate: '2026-10-02T13:00:00Z'
      }
    ],
    timeline: [
      { step: 'Pedido Criado', date: '02/10/2026 11:00', author: 'Juliana Marinho', done: true },
      { step: 'Arte Aprovada', date: '02/10/2026 13:00', author: 'Lucas Ferreira', done: true },
      { step: 'Produção Concluída', date: '04/10/2026 17:00', author: 'Produção', done: true },
      { step: 'Entregue no Balcão Delmiro Gouveia', date: '05/10/2026 10:15', author: 'Juliana Marinho', done: true }
    ]
  }
];

export const INITIAL_USERS = [
  {
    id: 1,
    name: 'Everton Santos',
    email: 'admin@printpro.com.br',
    role: 'ADMINISTRADOR',
    status: 'ATIVO',
    phone: '(82) 99911-0001',
    createdAt: '2026-01-10'
  },
  {
    id: 2,
    name: 'Lucas Ferreira',
    email: 'lucas.preimpressao@printpro.com.br',
    role: 'RESPONSAVEL_GRAFICA',
    status: 'ATIVO',
    phone: '(82) 99911-0002',
    createdAt: '2026-02-15'
  },
  {
    id: 3,
    name: 'Carlos Eduardo Santos',
    email: 'carlos@hamburgueriadelmiro.com.br',
    role: 'CLIENTE',
    status: 'ATIVO',
    phone: '(82) 98845-1290',
    createdAt: '2026-03-20'
  },
  {
    id: 4,
    name: 'Dra. Mariana Costa',
    email: 'mariana@costaadvocacia.com.br',
    role: 'CLIENTE',
    status: 'ATIVO',
    phone: '(82) 99123-4567',
    createdAt: '2026-04-05'
  }
];

export const INITIAL_CLIENTS = [
  {
    id: 1,
    name: 'Carlos Eduardo Santos',
    company: 'Hamburgueria Delmiro Gourmet',
    document: '12.345.678/0001-90',
    documentType: 'CNPJ',
    email: 'carlos@hamburgueriadelmiro.com.br',
    phone: '(82) 98845-1290',
    city: 'Delmiro Gouveia',
    state: 'AL',
    address: 'Av. Presidente Castelo Branco, 450 - Centro',
    totalOrders: 6,
    totalSpent: 489.50,
    status: 'ATIVO'
  },
  {
    id: 2,
    name: 'Dra. Mariana Costa',
    company: 'Costa Advocacia & Consultoria',
    document: '987.654.321-00',
    documentType: 'CPF',
    email: 'mariana@costaadvocacia.com.br',
    phone: '(82) 99123-4567',
    city: 'Delmiro Gouveia',
    state: 'AL',
    address: 'Rua 7 de Setembro, 120 - Sala 3',
    totalOrders: 3,
    totalSpent: 215.80,
    status: 'ATIVO'
  },
  {
    id: 3,
    name: 'Beatriz Lima',
    company: 'Beatriz Cerimonial & Eventos',
    document: '23.456.789/0001-12',
    documentType: 'CNPJ',
    email: 'beatriz@limacerimonial.com',
    phone: '(82) 99654-7890',
    city: 'Delmiro Gouveia',
    state: 'AL',
    address: 'Rua Floriano Peixoto, 88',
    totalOrders: 11,
    totalSpent: 1840.00,
    status: 'ATIVO'
  },
  {
    id: 4,
    name: 'Roberto Alencar',
    company: 'Ponto da Pizza Delmiro',
    document: '34.567.890/0001-34',
    documentType: 'CNPJ',
    email: 'contato@pontodapizzadg.com.br',
    phone: '(82) 98711-2233',
    city: 'Delmiro Gouveia',
    state: 'AL',
    address: 'Av. Caxangá, 215',
    totalOrders: 8,
    totalSpent: 730.00,
    status: 'ATIVO'
  }
];

export const INITIAL_SETTINGS = {
  markupPercentage: 45, // 45%
  squareMeterLonaRate: 38.00, // R$ 38 / m2
  thousandCoucheRate: 48.00, // R$ 48 por milheiro base
  uvVarnishFee: 35.00,
  minUrgencyHours: 24,
  freeFileCheck: true,
  storeAddress: 'Delmiro Gouveia - AL',
  whatsappNumber: '(82) 99999-9999',
  contactEmail: 'atendimento@printpro.com.br'
};
