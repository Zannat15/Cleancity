document.addEventListener('DOMContentLoaded', () => {

  // ===== MODAL OPEN/CLOSE =====
  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.open);
      if(modal) modal.classList.add('active');
    });
  });

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.close);
      if(modal) modal.classList.remove('active');
    });
  });

  document.querySelectorAll('.modal__backdrop').forEach(bg => {
    bg.addEventListener('click', () => bg.parentElement.classList.remove('active'));
  });

  // ===== ROLE TOGGLE BUTTONS =====
  document.querySelectorAll('.role-toggle').forEach(container => {
    const buttons = container.querySelectorAll('.role-toggle__btn');
    const hiddenInput = container.querySelector('input[type="hidden"]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        hiddenInput.value = btn.dataset.role;
      });
    });
  });

  // ===== SWITCH LOGIN/REGISTER =====
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-switch]');
    if (!link) return;
    e.preventDefault();
    const target = link.getAttribute('data-switch');
    const current = link.getAttribute('data-current');
    if (current) document.getElementById(current).classList.remove('active');
    if (target) document.getElementById(target).classList.add('active');
  });

  // ===== REGISTER =====
  const registerForm = document.getElementById('registerForm');
  if(registerForm){
    registerForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const role = document.getElementById('registerRole').value || 'citizen';
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const pass = document.getElementById('regPass').value;
      const pass2 = document.getElementById('regPass2').value;

      if(!name) return alert('Enter your name');
      if(pass !== pass2) return alert('Passwords do not match');

      let users = JSON.parse(localStorage.getItem('usersDB')) || [];
      if(users.some(u=>u.email===email && u.role===role)) return alert('Email already exists');

      const newUser = { role, name, email, password: pass };
      users.push(newUser);
      localStorage.setItem('usersDB', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      if(role==='citizen') window.location.href='citizen-profile.html';
      else window.location.href='authority-profile.html';
    });
  }

  // ===== LOGIN =====
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const role = document.getElementById('loginRole').value || 'citizen';
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const pass = document.getElementById('loginPass').value;

      const users = JSON.parse(localStorage.getItem('usersDB')) || [];
      const user = users.find(u=>u.email===email && u.password===pass && u.role===role);
      if(!user) return alert('Invalid credentials or role');

      localStorage.setItem('currentUser', JSON.stringify(user));
      if(role==='citizen') window.location.href='citizen-profile.html';
      else window.location.href='authority-profile.html';
    });
  }

});
