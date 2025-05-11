<template>
    <h2 id="main-title">CUIT 校友友链</h2>
    <div id="selector-container">
        <SelectedUi v-model="selectedYear" :options="graduationYear" placeholder="选择毕业年份" />
        <SelectedUi v-model="selectedMajor" :options="major" placeholder="选择专业" />
        <SelectedUi v-model="selectedTechnicalDirection" :options="technicalDirection" placeholder="选择技术方向" />
    </div>
    <div id="blog-container">
        <FriendCard v-for="friend in friends" :key="friend.name" :friend="friend" />
    </div>
</template>

<script setup lang="ts">
import SelectedUi from "./ui/SelectedUi.vue";
import FriendCard from "./Card/FriendCard.vue";
import { ref, onMounted } from "vue"
import { link } from "fs";

// 被筛选数据
const selectedYear = ref('')
const selectedMajor = ref('')
const selectedTechnicalDirection = ref('')

// 筛选条件列表
const graduationYear = ref([
    { value: 2021, label: "毕业于2021年" },
    { value: 2020, label: "毕业于2020年" },
    { value: 2019, label: "毕业于2019年" },
    { value: 2018, label: "毕业于2018年" },
    { value: 2017, label: "毕业于2017年" },
    { value: 2016, label: "毕业于2016年" },
    { value: 2015, label: "毕业于2015年" },
])

const major = ref([
    { value: '计算机科学与技术', label: '计算机科学与技术' },
    { value: '软件工程', label: '软件工程' },
    { value: '通信工程', label: '通信工程' },
    { value: '电子信息工程', label: '电子信息工程' },
    { value: '自动化', label: '自动化' },
    { value: '计算机技术', label: '计算机技术' },
    { value: '网络工程', label: '网络工程' },
    { value: '信息安全', label: '信息安全' },
    { value: '软件理论', label: '软件理论' },
    { value: '数据库', label: '数据库' },
    { value: '人工智能', label: '人工智能' },
    { value: '其他', label: '其他' },
])

const technicalDirection = ref([
    { value: '前端开发', label: '前端开发' },
    { value: '后端开发', label: '后端开发' },
    { value: '移动开发', label: '移动开发' },
    { value: '数据库开发', label: '数据库开发' },
    { value: '测试开发', label: '测试开发' },
    { value: '安全开发', label: '安全开发' },
    { value: '运维开发', label: '运维开发' },
    { value: 'UI设计', label: 'UI设计' },
    { value: '其他', label: '其他' },
])

const friends = ref([])

const loadFriends = async () => {
    try {
        const friendModules = import.meta.glob('../../../src/data/friends/*.json');
        const friendData = [];
        for (const path in friendModules) {
            const module = await friendModules[path]();
            friendData.push(module.default);
        }
        // 这里进行排序处理
        friends.value = friendData.sort((a, b) => a.name.localeCompare(b.name));
        console.log("加载资源成功", friends.value);
    } catch (error) {
        console.error("加载资源失败", error);
    }
}

onMounted(loadFriends)
</script>

<style scoped>
#main-title {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--vp-c-text-1);
}

#selector-container {

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 40px 0;

}

#blog-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    width: 80%;
    max-width: 1200px;
    margin: 0 auto;
}

@media (max-width:1080px) {
    #blog-container {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
</style>
