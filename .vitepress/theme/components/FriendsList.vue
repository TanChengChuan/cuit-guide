<template>
    <div id="selector-container">
        <h2> 筛选器 </h2>
        <SelectedUi v-model="selectedYear" :options="graduationYear" placeholder="选择毕业年份" />
        <SelectedUi v-model="selectedYear" :options="graduationYear" placeholder="选择毕业年份" />
        <SelectedUi v-model="selectedYear" :options="graduationYear" placeholder="选择毕业年份" />
    </div>
    <div id="blog-container">

    </div>
</template>

<script setup lang="ts">
import SelectedUi from "./ui/SelectedUi.vue";
import { ref } from "vue"

const selectedYear = ref('')
const graduationYear = ref([
    { value: 2021, label: "毕业于2021年" },
    { value: 2020, label: "毕业于2020年" },
    { value: 2019, label: "毕业于2019年" },
    { value: 2018, label: "毕业于2018年" },
    { value: 2017, label: "毕业于2017年" },
    { value: 2016, label: "毕业于2016年" },
    { value: 2015, label: "毕业于2015年" },
])
</script>

<style scoped>
#selector-container {
    display: flex;
    gap: 20px;
}
</style>
