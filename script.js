function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("user", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Isi username dan password!");
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

/* Proteksi halaman */
if (window.location.pathname.includes("dashboard")) {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
  } else {
    document.getElementById("welcome").innerText =
      "Halo, " + user;
    tampilkanKreasi();
  }
}

function simpanKreasi() {
  const judul = document.getElementById("judul").value;
  const bahan = document.getElementById("bahan").value;
  const proses = document.getElementById("proses").value;
  const foto = document.getElementById("foto").files[0];

  if (!judul || !bahan || !proses || !foto) {
    alert("Semua data harus diisi!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const data = JSON.parse(localStorage.getItem("kreasi")) || [];
    data.push({
      judul,
      bahan,
      proses,
      foto: reader.result
    });
    localStorage.setItem("kreasi", JSON.stringify(data));
    tampilkanKreasi();
  };
  reader.readAsDataURL(foto);
}

function tampilkanKreasi() {
  const galeri = document.getElementById("galeri");
  galeri.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("kreasi")) || [];
  data.forEach(item => {
    galeri.innerHTML += `
      <div class="card">
        <img src="${item.foto}">
        <h4>${item.judul}</h4>
        <p><strong>Bahan:</strong><br>${item.bahan}</p>
        <p><strong>Proses:</strong><br>${item.proses}</p>
      </div>
    `;
  });
}
