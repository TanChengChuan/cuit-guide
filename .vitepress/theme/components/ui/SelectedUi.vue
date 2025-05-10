<template>
    <div class="selector-container" ref="container">
        <div class="selector-header" @click.stop="toggleDropdown">
            {{ selectedOption || placeholder }}
            <span class="arrow" :class="{ 'open': isOpen }">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
            </span>
        </div>
        <transition name="slide-fade">
            <ul v-show="isOpen" class="selector-dropdown">
                <li v-for="option in options" :key="option.value"
                    :class="{ 'selected': option.value === selectedValue }" @click.stop="selectOption(option)">
                    {{ option.label }}
                    <svg v-if="option.value === selectedValue" class="checkmark" width="16" height="16"
                        viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        modelValue: {
            type: [String, Number],
            default: null
        }
    },
    data() {
        return {
            isOpen: false,
            selectedValue: this.modelValue
        };
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    computed: {
        selectedOption() {
            const option = this.options.find(option => option.value === this.selectedValue);
            return option ? option.label : null;
        }
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.selectedValue = option.value;
            this.$emit('update:modelValue', this.selectedValue);
            this.isOpen = false;
        },
        handleClickOutside(event) {
            if (!this.$refs.container.contains(event.target)) {
                this.isOpen = false;
            }
        }
    }
};
</script>

<style scoped>
.selector-container {
    --selector-bg: var(--vp-c-bg);
    --selector-text: var(--vp-c-text-1);
    --selector-border: var(--vp-c-divider);
    --selector-hover: var(--vp-c-brand);
    --option-hover: var(--vp-c-default-soft);
    --option-selected-bg: var(--vp-c-brand-soft);
    --option-selected-text: var(--vp-c-brand);
    --checkmark-color: var(--vp-c-brand);

    position: relative;
    width: 150px;
    font-family: var(--vp-font-family-base);
}

.selector-header {
    padding: 6px 8px;
    border: 1px solid var(--selector-border);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
    background: var(--selector-bg);
    color: var(--selector-text);
    box-shadow: var(--vp-shadow-1);
    font-size: 14px;
}

.selector-header:hover {
    border-color: var(--selector-hover);
    box-shadow: var(--vp-shadow-2);
}

.arrow {
    color: var(--vp-c-text-2);
    transition: transform 0.2s ease;
}

.arrow.open {
    transform: rotate(180deg);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.selector-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    border: 1px solid var(--selector-border);
    border-radius: 8px;
    max-height: 240px;
    overflow-y: auto;
    background: var(--selector-bg);
    list-style-type: none;
    padding: 8px 0;
    margin: 0;
    z-index: 1000;
    box-shadow: var(--vp-shadow-3);
}

.selector-dropdown li {
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    color: var(--selector-text);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.selector-dropdown li:hover {
    background: var(--option-hover);
}

.selector-dropdown li.selected {
    background: var(--option-selected-bg);
    color: var(--option-selected-text);
}

.checkmark {
    color: var(--checkmark-color);
    margin-left: 8px;
    flex-shrink: 0;
}
</style>
