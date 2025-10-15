document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll untuk Anchor Internal (misalnya, href="#berita" di navbar)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Hapus #
            const target = document.getElementById(targetId) || document.querySelector(`[name="${targetId}"]`);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update active class di navbar jika relevan
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            } else {
                console.warn('Target not found:', targetId); // Debug
            }
        });
    });

    // Form Kontak Validation (untuk halaman kontak.html)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            // Validasi sederhana
            if (!name || !email || !message) {
                showAlert('Mohon isi semua field dengan benar!', 'error');
                return;
            }

            // Validasi email sederhana (opsional)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Format email tidak valid!', 'error');
                return;
            }

            // Simulasi pengiriman (ganti dengan AJAX/Fetch ke server jika ada backend)
            showAlert('Pesan Anda telah dikirim! Terima kasih. Kami akan balas segera.', 'success');
            form.reset();
        });
    }

    // Fungsi helper untuk alert (lebih user-friendly daripada alert() native)
    function showAlert(message, type = 'info') {
        // Hapus alert lama jika ada
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) existingAlert.remove();

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} custom-alert position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${message}</span>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        document.body.appendChild(alertDiv);

        // Auto-hide setelah 3 detik
        setTimeout(() => {
            if (alertDiv.parentNode) alertDiv.remove();
        }, 3000);
    }
});