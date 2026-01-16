// Landmark Data with curated Unsplash images
const landmarks = {
    'notre-dame': {
        name: 'Notre Dame Cathedral',
        subtitle: 'Paris · French Gothic · XII Century',
        location: [48.852968, 2.349902],
        images: [
            'images/landmark-0.png',
            'https://images.unsplash.com/photo-1565457211452-16f8e7062a0a?w=1200', // Cathedral front view
            'https://images.unsplash.com/photo-1551120343-863a43d33990?w=1200', // Brown concrete exterior
            'https://images.unsplash.com/photo-1642602453380-7754b2e53fa0?w=1200', // Cathedral with crowd
            'https://images.unsplash.com/photo-1599457435394-63f83db8f0d6?w=1200'  // Interior gold & blue
        ]
    },
    'sagrada-familia': {
        name: 'Sagrada Família',
        subtitle: 'Barcelona · Gaudí · Begun 1882',
        location: [41.403629, 2.174356],
        images: [
            'images/landmark-1.png',
            'https://images.unsplash.com/photo-1722863380905-539ae092fc5f?w=1200', // Spire with clock detail
            'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=1200', // Ornate facade daytime
            'https://images.unsplash.com/photo-1735424325493-7dec695219c4?w=1200', // Interior stained glass
            'https://images.unsplash.com/photo-1762882450546-208975b68ecf?w=1200'  // Interior columns & windows
        ]
    },
    'taj-mahal': {
        name: 'Taj Mahal',
        subtitle: 'Agra · Mughal · XVII Century',
        location: [27.175144, 78.042142],
        images: [
            'images/landmark-4.png',
            'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200', // Classic front view
            'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200', // Reflection pool
            'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=1200', // Sunrise view
            'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1200', // Side angle
            'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200'  // Detail shot
        ]
    },
    'colosseum': {
        name: 'The Colosseum',
        subtitle: 'Rome · Roman · I Century AD',
        location: [41.890210, 12.492231],
        images: [
            'images/landmark-colosseum.png',
            'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200', // Exterior day
            'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=1200', // Interior arena
            'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200', // Arches detail
            'https://images.unsplash.com/photo-1569874861186-14568e8fb3cd?w=1200', // Night view
            'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=1200'  // Wide angle
        ]
    },
    'hagia-sophia': {
        name: 'Hagia Sophia',
        subtitle: 'Istanbul · Byzantine · VI Century',
        location: [41.008583, 28.980175],
        images: [
            'images/landmark-2.png',
            'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200', // Exterior with minarets
            'https://images.unsplash.com/photo-1545459720-aae8c8a97cb4?w=1200', // Interior dome
            'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=1200', // Mosaics
            'https://images.unsplash.com/photo-1621354159750-46dc90f97cec?w=1200', // Calligraphy detail
            'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200'  // Sunset exterior
        ]
    },
    'parthenon': {
        name: 'The Parthenon',
        subtitle: 'Athens · Classical Greek · V Century BCE',
        location: [37.971532, 23.725749],
        images: [
            'images/landmark-parthenon.png',
            'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200', // Full view
            'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=1200', // Columns detail
            'https://images.unsplash.com/photo-1608730304284-79a72e3f48b8?w=1200', // Sunset view
            'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?w=1200', // Night illuminated
            'https://images.unsplash.com/photo-1558619535-e7d3dcb7e391?w=1200'  // Athens panorama
        ]
    },
    'sydney-opera-house': {
        name: 'Sydney Opera House',
        subtitle: 'Sydney · Expressionist · XX Century',
        location: [-33.856784, 151.215297],
        images: [
            'images/landmark-sydney.png',
            'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=1200', // Harbor view
            'https://images.unsplash.com/photo-1530276371031-2511efff3d5d?w=1200', // Sails close-up
            'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200', // Sunset silhouette
            'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?w=1200', // Night view
            'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?w=1200'  // Aerial view
        ]
    }
};

// State
let currentLandmark = null;
let currentImageIndex = 0;
let currentView = 'map'; // 'map' | 'gallery' | 'lightbox'
let map = null;

// DOM Elements
const modal = document.getElementById('gallery-modal');
const mapView = document.querySelector('.modal-map-view');
const galleryView = document.querySelector('.modal-gallery-view');
const lightbox = document.querySelector('.lightbox');
const modalTitle = document.querySelector('.modal-title');
const modalSubtitle = document.querySelector('.modal-subtitle');
const thumbnailGrid = document.querySelector('.thumbnail-grid');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCounter = document.querySelector('.lightbox-counter');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add click listeners to card images
    document.querySelectorAll('.card').forEach(card => {
        const imageContainer = card.querySelector('.card-image-container');
        imageContainer.style.cursor = 'pointer';
        imageContainer.addEventListener('click', () => {
            const landmarkId = card.dataset.landmark;
            openModal(landmarkId);
        });
    });

    // Close modal button
    document.querySelector('.modal-close-btn').addEventListener('click', closeModal);

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // View Gallery button
    document.querySelector('.view-gallery-btn').addEventListener('click', showGalleryView);

    // Back to Map button
    document.querySelector('.back-to-map-btn').addEventListener('click', showMapView);

    // Lightbox controls
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
    document.querySelector('.lightbox-next').addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
});

function handleKeyboard(e) {
    if (!modal.classList.contains('visible')) return;

    switch (e.key) {
        case 'Escape':
            if (currentView === 'lightbox') {
                closeLightbox();
            } else {
                closeModal();
            }
            break;
        case 'ArrowLeft':
            if (currentView === 'lightbox') showPrevImage();
            break;
        case 'ArrowRight':
            if (currentView === 'lightbox') showNextImage();
            break;
    }
}

function openModal(landmarkId) {
    const data = landmarks[landmarkId];
    if (!data) return;

    currentLandmark = data;
    currentView = 'map';

    // Update modal content
    modalTitle.textContent = data.name;
    modalSubtitle.textContent = data.subtitle;

    // Reset views
    mapView.classList.add('active');
    galleryView.classList.remove('active');
    lightbox.classList.remove('active');

    // Show modal with animation
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.add('visible');
    });

    // Initialize map after modal is visible
    setTimeout(() => {
        initMap(data.location, data.name);
    }, 100);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('visible');

    setTimeout(() => {
        modal.style.display = 'none';

        // Clean up map
        if (map) {
            map.remove();
            map = null;
        }

        // Reset state
        currentLandmark = null;
        currentView = 'map';

        // Restore body scroll
        document.body.style.overflow = '';
    }, 300);
}

function showMapView() {
    currentView = 'map';
    galleryView.classList.remove('active');
    mapView.classList.add('active');

    // Reinitialize map if needed
    setTimeout(() => {
        if (map) map.invalidateSize();
    }, 100);
}

function showGalleryView() {
    currentView = 'gallery';
    mapView.classList.remove('active');

    // Generate thumbnails
    generateThumbnails();

    galleryView.classList.add('active');
}

function generateThumbnails() {
    if (!currentLandmark) return;

    thumbnailGrid.innerHTML = '';

    currentLandmark.images.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = `<img src="${imgSrc}" alt="${currentLandmark.name} - Image ${index + 1}">`;
        thumbnail.addEventListener('click', () => openLightbox(index));
        thumbnailGrid.appendChild(thumbnail);
    });
}

function openLightbox(index) {
    currentView = 'lightbox';
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
}

function closeLightbox() {
    currentView = 'gallery';
    lightbox.classList.remove('active');
}

function updateLightboxImage() {
    if (!currentLandmark) return;

    const imgSrc = currentLandmark.images[currentImageIndex];
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = imgSrc;
        lightboxImage.alt = `${currentLandmark.name} - Image ${currentImageIndex + 1}`;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentLandmark.images.length}`;
        lightboxImage.onload = () => {
            lightboxImage.style.opacity = '1';
        };
    }, 150);
}

function showPrevImage() {
    if (!currentLandmark) return;
    currentImageIndex = (currentImageIndex - 1 + currentLandmark.images.length) % currentLandmark.images.length;
    updateLightboxImage();
}

function showNextImage() {
    if (!currentLandmark) return;
    currentImageIndex = (currentImageIndex + 1) % currentLandmark.images.length;
    updateLightboxImage();
}

function initMap(coords, title) {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Clean up existing map
    if (map) {
        map.remove();
        map = null;
    }

    // Create map with minimal controls
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        dragging: false,      // Non-interactive for visual context
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false
    }).setView(coords, 14);

    // CartoDB Positron - clean, minimal style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Custom marker with accent color
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin"></div>`,
        iconSize: [30, 40],
        iconAnchor: [15, 40]
    });

    L.marker(coords, { icon: customIcon }).addTo(map);

    // Fix sizing issues
    setTimeout(() => {
        map.invalidateSize();
    }, 200);
}
