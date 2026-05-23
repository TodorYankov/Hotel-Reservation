// solution.js
let reservation = {
        startDate: '', endDate: '', guestsCount: '', roomType: '',
        name: '', phone: '', email: ''
    };

    function changeContent(className) {
        document.querySelectorAll('.custom-form').forEach(el => el.classList.add('hidden'));
        const target = document.querySelector('.' + className);
        if (target) target.classList.remove('hidden');
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Search
        document.getElementById('search-form-button').onclick = (e) => {
            e.preventDefault();
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const people = document.getElementById('people').value;
            if (checkIn && checkOut && people && new Date(checkIn) <= new Date(checkOut)) {
                reservation.startDate = checkIn;
                reservation.endDate = checkOut;
                reservation.guestsCount = people;
                changeContent('search-result-form-content');
            } else alert('Моля, попълнете коректно датите и брой хора.');
        };

        // Offers - select room
        document.querySelectorAll('.room-type').forEach(room => {
            room.onclick = (e) => {
                document.querySelectorAll('.room-type').forEach(r => r.classList.remove('selected-room'));
                room.classList.add('selected-room');
            };
        });
        document.getElementById('search-back-btn').onclick = (e) => { e.preventDefault(); changeContent('search-form-content'); };
        document.getElementById('search-next-btn').onclick = (e) => {
            e.preventDefault();
            const selected = document.querySelector('.offer-card.selected-room');
            if (!selected) { alert('Моля, изберете стая'); return; }
            reservation.roomType = selected.getAttribute('data-room');
            changeContent('guest-details-form-content');
        };

        // Guest details
        document.getElementById('guest-details-back-btn').onclick = (e) => { e.preventDefault(); changeContent('search-result-form-content'); };
        document.getElementById('guest-details-next-btn').onclick = (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone-number').value;
            const email = document.getElementById('email').value;
            if (name && phone && email) {
                reservation.name = name; reservation.phone = phone; reservation.email = email;
                document.getElementById('guest-name').innerText = `Name: ${reservation.name}`;
                document.getElementById('guest-phone').innerText = `Phone: ${reservation.phone}`;
                document.getElementById('guest-email').innerText = `Email: ${reservation.email}`;
                document.getElementById('guest-room-type').innerText = `Room: ${reservation.roomType}`;
                document.getElementById('guest-data-in').innerText = `Date-in: ${reservation.startDate}`;
                document.getElementById('guest-data-out').innerText = `Date-out: ${reservation.endDate}`;
                changeContent('confirm-reservation-content');
            } else alert('Моля, попълнете всички лични данни');
        };

        // Confirm
        document.getElementById('confirm-back-btn').onclick = (e) => { e.preventDefault(); changeContent('guest-details-form-content'); };
        document.getElementById('confirm-reservation').onclick = (e) => { e.preventDefault(); changeContent('thank-you-content'); };

        // New Reservation – гарантирано работи
        const newBtn = document.getElementById('thankyou-new-reservation');
        if (newBtn) {
            newBtn.onclick = (e) => {
                e.preventDefault();
                reservation = { startDate: '', endDate: '', guestsCount: '', roomType: '', name: '', phone: '', email: '' };
                document.getElementById('check-in').value = '';
                document.getElementById('check-out').value = '';
                document.getElementById('people').value = '';
                document.getElementById('name').value = '';
                document.getElementById('phone-number').value = '';
                document.getElementById('email').value = '';
                document.querySelectorAll('.room-type').forEach(r => r.classList.remove('selected-room'));
                changeContent('search-form-content');
            };
        } else console.error('Бутон #thankyou-new-reservation не е намерен');

        changeContent('search-form-content');
    });
	