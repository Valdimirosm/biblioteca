document.addEventListener('DOMContentLoaded', function () {
    // Seleção de elementos
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const libraryContainer = document.getElementById('library-container');
    const authContainer = document.getElementById('auth-container');
    const logoutLink = document.getElementById('logout');
  
    // Se já houver um usuário logado, exibe a biblioteca
    if (localStorage.getItem('loggedInUser')) {
      showLibrary();
    }
  
    // Alterna para o formulário de cadastro
    showRegisterLink.addEventListener('click', function (e) {
      e.preventDefault();
      loginSection.style.display = 'none';
      registerSection.style.display = 'block';
    });
  
    // Alterna para o formulário de login
    showLoginLink.addEventListener('click', function (e) {
      e.preventDefault();
      registerSection.style.display = 'none';
      loginSection.style.display = 'block';
    });
  
    // Cadastro
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;
  
      if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
      }
  
      // Verifica se o email já foi cadastrado
      if (localStorage.getItem(email)) {
        alert('Email já cadastrado. Por favor, faça login.');
        return;
      }
  
      // Salva o usuário no localStorage
      const user = { name, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      alert('Cadastro realizado com sucesso! Agora faça login.');
      
      // Alterna para o formulário de login
      registerSection.style.display = 'none';
      loginSection.style.display = 'block';
      registerForm.reset();
    });
  
    // Login
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
  
      const userData = localStorage.getItem(email);
      if (!userData) {
        alert('Usuário não encontrado. Por favor, cadastre-se.');
        return;
      }
      const user = JSON.parse(userData);
      if (user.password !== password) {
        alert('Senha incorreta.');
        return;
      }
      // Login realizado com sucesso
      localStorage.setItem('loggedInUser', email);
      showLibrary();
    });
  
    // Logout
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('loggedInUser');
      location.reload();
    });
  
    // Função para exibir o conteúdo da biblioteca
    function showLibrary() {
      authContainer.style.display = 'none';
      libraryContainer.style.display = 'block';
    }
  });
  