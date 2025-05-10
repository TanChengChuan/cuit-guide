<template>
    <div class="friend-card" :class="{ 'hover-effect': hoverEffect }" @mousemove="handleMouseMove">
        <div class="card-banner">
            <img :src="friend.avatar" alt="avatar" class="avatar" />
            <div class="banner-shine"></div>
        </div>

        <div class="card-content">
            <h3 class="name">
                <a :href="friend.link" target="_blank" rel="noopener">
                    {{ friend.name }}
                    <svg class="external-icon" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
                    </svg>
                </a>
            </h3>

            <p class="description">{{ friend.description }}</p>

            <div class="social-links">
                <a v-for="(url, platform) in friend.social" :key="platform" :href="url" target="_blank" rel="noopener"
                    class="social-icon">
                    <component :is="getSocialIcon(platform)" />
                </a>
            </div>
        </div>

        <div class="card-backdrop"></div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { Github, Twitter, Linkedin, Mail } from 'lucide-vue-next'

const props = defineProps({
    friend: {
        type: Object,
        required: true,
        validator: (val) => ['name', 'link', 'avatar', 'description'].every(key => key in val)
    },
    hoverEffect: {
        type: Boolean,
        default: true
    }
})

const getSocialIcon = (platform) => {
    const icons = {
        github: Github,
        twitter: Twitter,
        linkedin: Linkedin,
        email: Mail
    }
    return icons[platform.toLowerCase()] || null
}

const handleMouseMove = (event) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

// 可选：自动移除样式属性
onBeforeUnmount(() => {
    const el = document.querySelector('.friend-card')
    el?.style.removeProperty('--x')
    el?.style.removeProperty('--y')
})
</script>

<style scoped>
/* 保持原有样式不变 */
.friend-card {
    --card-bg: var(--vp-c-bg-soft);
    --card-border: var(--vp-c-divider);
    --text-color: var(--vp-c-text-1);
    --accent-color: var(--vp-c-brand);
    --hover-overlay: var(--vp-c-default-soft);

    position: relative;
    border-radius: 16px;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    transform-style: preserve-3d;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    overflow: hidden;
}

.hover-effect:hover {
    transform: translateY(-4px) rotateX(1deg) rotateY(-1deg);
    box-shadow: var(--vp-shadow-3);
}

.card-banner {
    position: relative;
    height: 140px;
    overflow: hidden;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.3s ease;
}

.hover-effect:hover .avatar {
    filter: grayscale(0%);
}

.banner-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0.1) 70%,
            rgba(255, 255, 255, 0) 80%);
    opacity: 0;
    transition: opacity 0.4s ease;
}

.hover-effect:hover .banner-shine {
    opacity: 0.6;
}

.card-content {
    padding: 20px;
    position: relative;
    z-index: 1;
}

.name {
    margin: 0 0 12px;
    font-size: 1.3em;
}

.name a {
    color: var(--text-color);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.external-icon {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    opacity: 0.7;
    transition: all 0.2s ease;
}

.name a:hover .external-icon {
    transform: translate(2px, -2px);
    opacity: 1;
    stroke: var(--accent-color);
}

.description {
    color: var(--vp-c-text-2);
    font-size: 0.95em;
    line-height: 1.5;
    margin: 0 0 16px;
}

.social-links {
    display: flex;
    gap: 12px;
    margin-top: auto;
}

.social-icon {
    color: var(--vp-c-text-2);
    padding: 6px;
    border-radius: 8px;
    transition: all 0.2s ease;
    display: flex;
}

.social-icon:hover {
    color: var(--accent-color);
    background: var(--hover-overlay);
    transform: translateY(-2px);
}

.social-icon>>>svg {
    width: 20px;
    height: 20px;
}

.card-backdrop {
    position: absolute;
    inset: 0;
    background: radial-gradient(400px circle at var(--x) var(--y),
            var(--vp-c-brand-soft-mute) 0%,
            transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.hover-effect:hover .card-backdrop {
    opacity: 0.3;
}

@media (max-width: 768px) {
    .friend-card {
        border-radius: 12px;
    }

    .card-banner {
        height: 120px;
    }

    .card-content {
        padding: 16px;
    }
}
</style>
