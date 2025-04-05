import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Nav, Carousel, Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Phone } from 'lucide-react';

function App() {
  // State for login/register modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  // State for product detail modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State for cart
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // State for shipping calculation
  const [cepDestino, setCepDestino] = useState('');
  const [frete, setFrete] = useState(0);
  
  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Conjunto Bebê Branco',
      price: 89.90,
      image: 'https://picsum.photos/300/300?random=1',
      description: 'Conjunto confortável de algodão 100% para bebês recém-nascidos.'
    },
    {
      id: 2,
      name: 'Manta Rosa com Bolinhas',
      price: 69.90,
      image: 'https://picsum.photos/300/300?random=2',
      description: 'Manta macia de algodão com estampa de bolinhas para bebês.'
    },
    {
      id: 3,
      name: 'Kit Berço Completo',
      price: 299.90,
      image: 'https://picsum.photos/300/300?random=3',
      description: 'Kit completo para berço com protetor, lençol e fronha.'
    },
    {
      id: 4,
      name: 'Body Manga Longa',
      price: 49.90,
      image: 'https://picsum.photos/300/300?random=4',
      description: 'Body de manga longa em algodão pima para maior conforto.'
    },
    {
      id: 5,
      name: 'Meia Bebê Kit com 3',
      price: 29.90,
      image: 'https://picsum.photos/300/300?random=5',
      description: 'Kit com 3 meias para bebê em cores sortidas.'
    },
    {
      id: 6,
      name: 'Toalha com Capuz',
      price: 59.90,
      image: 'https://picsum.photos/300/300?random=6',
      description: 'Toalha de banho com capuz para bebês, extra macia.'
    }
  ];

  // Function to open product detail
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Function to add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
    
    setShowProductModal(false);
  };

  // Function to calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Function to calculate shipping cost
  const calcularFrete = (cepDestino) => {
    const regioes = [
      { faixa: /^60/, custoBase: 10 }, // Região de Fortaleza
      { faixa: /^61|62|63/, custoBase: 20 }, // Região Nordeste
      { faixa: /^7/, custoBase: 30 }, // Região Centro-Oeste
      { faixa: /^8/, custoBase: 40 }, // Região Sudeste
      { faixa: /^9/, custoBase: 50 }, // Região Sul
    ];

    const pesoTotal = cart.reduce((total, item) => total + item.quantity, 0); // Peso total baseado na quantidade de itens
    const regiao = regioes.find(r => r.faixa.test(cepDestino));

    if (!regiao) {
      alert('CEP inválido ou fora da área de entrega.');
      return;
    }

    const custoFrete = regiao.custoBase + pesoTotal * 5; // Exemplo: R$5 por kg
    setFrete(custoFrete);
    alert(`O valor do frete para o CEP ${cepDestino} é R$ ${custoFrete.toFixed(2)}`);
  };

  return (
    <Router>
      <div className="baby-shop" style={{ backgroundColor: '#FDEEF4', minHeight: '100vh' }}>
        {/* Carousel Section */}
        <Carousel className="mb-4">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/1200/400?random=1"
              alt="Promoção de Lançamento"
            />
            <Carousel.Caption>
              <h3>Novidades para o seu bebê</h3>
              <p>Conheça nossa nova coleção de roupas e acessórios</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/1200/400?random=2"
              alt="Descontos Especiais"
            />
            <Carousel.Caption>
              <h3>Até 35% de desconto</h3>
              <p>Promoção por tempo limitado em produtos selecionados</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/1200/400?random=3"
              alt="Kits para Presente"
            />
            <Carousel.Caption>
              <h3>Kits para Presente</h3>
              <p>Opções perfeitas para presentear</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Navbar */}
        <Navbar style={{ backgroundColor: '#ADD8E6' }} expand="lg" sticky="top" className="mb-4">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src={`${process.env.PUBLIC_URL}/logo.jpg`} // Caminho correto para a logo
                alt="Bebê a Bordo"
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
              Bebê a Bordo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#catalog">Catálogo</Nav.Link>
                <Nav.Link href="#about">Sobre Nós</Nav.Link>
                <Nav.Link href="#footer">Contato</Nav.Link>
              </Nav>
              <Nav>
                <Button 
                  variant="outline-primary" 
                  className="me-2" 
                  onClick={() => setShowLoginModal(true)}
                >
                  Login/Cadastro
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setShowCart(true)}
                >
                  Carrinho ({cart.reduce((total, item) => total + item.quantity, 0)})
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Content */}
        <Container>
          {/* Featured Info Section */}
          <section className="mb-5 bg-light p-4 rounded">
            <Row>
              <Col md={4} className="text-center mb-3 mb-md-0">
                <div className="feature-icon mb-2">
                  <img 
                    src="https://picsum.photos/80/80?random=7" 
                    alt="Algodão Premium" 
                    className="rounded-circle" 
                  />
                </div>
                <h5>Algodão 100% Premium</h5>
                <p className="small">Produtos feitos com algodão orgânico de alta qualidade</p>
              </Col>
              <Col md={4} className="text-center mb-3 mb-md-0">
                <div className="feature-icon mb-2">
                  <img 
                    src="https://picsum.photos/80/80?random=8" 
                    alt="Envio Rápido" 
                    className="rounded-circle" 
                  />
                </div>
                <h5>Envio Rápido</h5>
                <p className="small">Entregamos em todo o Brasil em até 3 dias úteis</p>
              </Col>
              <Col md={4} className="text-center">
                <div className="feature-icon mb-2">
                  <img 
                    src="https://picsum.photos/80/80?random=9" 
                    alt="Ecológico" 
                    className="rounded-circle" 
                  />
                </div>
                <h5>Eco-friendly</h5>
                <p className="small">Produtos e embalagens sustentáveis</p>
              </Col>
            </Row>
          </section>

          {/* Catalog Section */}
          <section id="catalog" className="mb-5">
            <h2 className="text-center mb-4">Nosso Catálogo</h2>
            <Row>
              {products.map(product => (
                <Col key={product.id} lg={4} md={6} className="mb-4">
                  <Card className="h-100">
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="text-primary fw-bold">
                        R$ {product.price.toFixed(2)}
                      </Card.Text>
                      <Button 
                        variant="outline-primary" 
                        onClick={() => openProductDetail(product)}
                      >
                        Ver Detalhes
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* About Us Section */}
          <section id="about" className="mb-5">
            <Row>
              <Col md={6}>
                <h2>Sobre Nós</h2>
                <p>
                  Somos uma loja especializada em produtos para bebês e recém-nascidos, 
                  com foco em qualidade premium e materiais naturais. Nossa missão é 
                  proporcionar conforto e segurança para os pequenos, com produtos 
                  que respeitem o meio ambiente.
                </p>
                <p>
                  Trabalhamos exclusivamente com algodão orgânico certificado e materiais
                  hipoalergênicos, garantindo o bem-estar do seu bebê desde os primeiros dias.
                </p>
                <Button variant="primary">Saiba Mais</Button>
              </Col>
              <Col md={6}>
                <img 
                  src="https://picsum.photos/500/300?random=10" 
                  alt="Nossa História" 
                  className="img-fluid rounded" 
                />
              </Col>
            </Row>
          </section>

          {/* Newsletter Section */}
          <section className="mb-5 bg-light p-4 rounded">
            <Row className="align-items-center">
              <Col md={6}>
                <h4>Receba Nossas Novidades</h4>
                <p>Cadastre-se para receber ofertas exclusivas e lançamentos.</p>
              </Col>
              <Col md={6}>
                <Form className="d-flex">
                  <Form.Control
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="me-2"
                  />
                  <Button variant="primary">Cadastrar</Button>
                </Form>
              </Col>
            </Row>
          </section>
        </Container>

        {/* Footer */}
        <footer id="footer" style={{ backgroundColor: '#ADD8E6' }} className="text-white p-4">
          <Container>
            <Row>
              <Col md={4} className="mb-3 mb-md-0 text-center">
                <img
                  src={`${process.env.PUBLIC_URL}/logo.jpg`} // Caminho correto para a logo
                  alt="Bebê a Bordo"
                  style={{ width: '100px', height: '100px', marginBottom: '10px' }}
                />
                <h5>Bebê a Bordo</h5>
                <p>A melhor loja para seu bebê.</p>
              </Col>
              <Col md={4} className="mb-3 mb-md-0">
                <h5>Atendimento</h5>
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 13h</p>
                <p>contato@bebeabordo.com</p>
              </Col>
              <Col md={4}>
                <h5>Formas de Pagamento</h5>
                <div className="payment-methods">
                  <img 
                    src={`${process.env.PUBLIC_URL}/formas_pagamento.png`} 
                    alt="Formas de Pagamento" 
                    className="img-fluid" 
                  />
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <div className="text-center">
              <p>&copy; 2025 Bebê a Bordo - Todos os direitos reservados</p>
              <p>Desenvolvido por Maria Ariel e Matheus Medeiros</p>
            </div>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;