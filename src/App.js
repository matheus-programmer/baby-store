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

  return (
    <Router>
      <div className="baby-shop">
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
        <Navbar bg="light" expand="lg" sticky="top" className="mb-4">
          <Container>
            <Navbar.Brand href="#home">BabyStore</Navbar.Brand>
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
        <footer id="footer" className="bg-dark text-white p-4">
          <Container>
            <Row>
              <Col md={4} className="mb-3 mb-md-0">
                <h5>BabyStore</h5>
                <p>A melhor loja para seu bebê.</p>
                <div className="d-flex align-items-center">
                  <Phone size={20} className="me-2" />
                  <span>(00) 12345-6789</span>
                </div>
              </Col>
              <Col md={4} className="mb-3 mb-md-0">
                <h5>Atendimento</h5>
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 13h</p>
                <p>contato@babystore.com</p>
              </Col>
              <Col md={4}>
                <h5>Formas de Pagamento</h5>
                <div className="payment-methods">
                  <img 
                    src="https://picsum.photos/200/50?random=11" 
                    alt="Formas de Pagamento" 
                    className="img-fluid" 
                  />
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <div className="text-center">
              <p>&copy; 2025 BabyStore - Todos os direitos reservados</p>
              <p>Desenvolvido por Maria Ariel e Matheus Medeiros</p>
            </div>
          </Container>
        </footer>

        {/* Product Detail Modal */}
        <Modal show={showProductModal} onHide={() => setShowProductModal(false)} size="lg">
          {selectedProduct && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6}>
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="img-fluid" />
                  </Col>
                  <Col md={6}>
                    <h3 className="mb-3">{selectedProduct.name}</h3>
                    <p className="text-primary fw-bold fs-4">R$ {selectedProduct.price.toFixed(2)}</p>
                    <p>{selectedProduct.description}</p>
                    <div className="mb-3">
                      <h6>Cores Disponíveis:</h6>
                      <div className="d-flex gap-2">
                        <div className="color-option bg-white border rounded-circle" style={{width: '25px', height: '25px'}}></div>
                        <div className="color-option bg-warning rounded-circle" style={{width: '25px', height: '25px'}}></div>
                        <div className="color-option bg-info rounded-circle" style={{width: '25px', height: '25px'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h6>Tamanhos:</h6>
                      <div className="d-flex gap-2">
                        <Button variant="outline-secondary" size="sm">P</Button>
                        <Button variant="outline-secondary" size="sm">M</Button>
                        <Button variant="outline-secondary" size="sm">G</Button>
                      </div>
                    </div>
                    <Button 
                      variant="primary" 
                      className="w-100"
                      onClick={() => addToCart(selectedProduct)}
                    >
                      Adicionar ao Carrinho
                    </Button>
                  </Col>
                </Row>
              </Modal.Body>
            </>
          )}
        </Modal>

        {/* Login/Register Modal */}
        <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isLogin ? 'Login' : 'Cadastro'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link active={isLogin} onClick={() => setIsLogin(true)}>Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={!isLogin} onClick={() => setIsLogin(false)}>Cadastro</Nav.Link>
              </Nav.Item>
            </Nav>
            
            {isLogin ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="seu@email.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Senha" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Entrar
                </Button>
              </Form>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control type="text" placeholder="Seu nome completo" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="seu@email.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Senha" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control type="password" placeholder="Confirmar senha" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Cadastrar
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>

        {/* Shopping Cart Modal */}
        <Modal show={showCart} onHide={() => setShowCart(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Carrinho de Compras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cart.length === 0 ? (
              <div className="text-center py-5">
                <h5>Seu carrinho está vazio</h5>
                <p>Adicione produtos para continuar.</p>
                <Button variant="outline-primary" onClick={() => setShowCart(false)}>
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <Row key={item.id} className="mb-3 align-items-center">
                    <Col xs={3} md={2}>
                      <img src={item.image} alt={item.name} className="img-fluid" />
                    </Col>
                    <Col xs={9} md={4}>
                      <h6>{item.name}</h6>
                      <p className="text-muted small mb-0">Tamanho: P | Cor: Branco</p>
                    </Col>
                    <Col xs={4} md={2} className="text-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => {
                            if (item.quantity > 1) {
                              setCart(cart.map(cartItem => 
                                cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
                              ));
                            } else {
                              setCart(cart.filter(cartItem => cartItem.id !== item.id));
                            }
                          }}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => {
                            setCart(cart.map(cartItem => 
                              cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
                            ));
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col xs={4} md={2} className="text-center">
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </Col>
                    <Col xs={4} md={2} className="text-center">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => setCart(cart.filter(cartItem => cartItem.id !== item.id))}
                      >
                        Remover
                      </Button>
                    </Col>
                  </Row>
                ))}
                <hr />
                <Row className="justify-content-end">
                  <Col md={6}>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Frete:</span>
                      <span>Calculado no checkout</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold">R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <Button 
                      variant="primary" 
                      className="w-100" 
                      onClick={() => {
                        const message = encodeURIComponent(
                          `Olá, desejo finalizar a seguinte compra:\n\n` +
                          cart.map(item => `- ${item.name} (Quantidade: ${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n') +
                          `\n\nSubtotal: R$ ${cartTotal.toFixed(2)}\n\nDesejo finalizar essa compra.`
                        );
                        window.open(`https://wa.me/5585992795965?text=${message}`, '_blank');
                      }}
                    >
                      Finalizar Compra
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Router>
  );
}

export default App;