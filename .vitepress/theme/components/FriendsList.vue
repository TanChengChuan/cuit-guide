<template>
    <h2 id="main-title">CUIT 校友友链</h2>
    <div id="selector-container">
        <SelectedUi v-model="selectedYear" :options="graduationYears" placeholder="选择毕业年份" />
        <SelectedUi v-model="selectedMajor" :options="majors" placeholder="选择专业" />
        <SelectedUi v-model="selectedTechnicalDirection" :options="technicalDirections" placeholder="选择技术方向" />
    </div>
    <div id="blog-container">
        <FriendCard v-for="friend in filteredFriends" :key="friend.name" :friend="friend" />
    </div>
    <EmptyState v-if="filteredFriends.length === 0" title="没有找到符合条件的校友" description="请尝试调整筛选条件">
    </EmptyState>
</template>

<script setup lang="ts">
import EmptyState from "./ui/EmptyState.vue";
import SelectedUi from "./ui/SelectedUi.vue";
import FriendCard from "./Card/FriendCard.vue";
import { ref, onMounted, type Ref, watch } from "vue"

interface Friend {
    name: string,
    graduationYear: number,
    major: string,
    technicalDirection: string,
    link: string,
    avatar: string,
    description: string,
}

interface yearOption {
    value: number,
    label: string
}

interface majorOption {
    value: string,
    label: string
}

interface technicalDirectionOption {
    value: string,
    label: string
}

// 被筛选数据
const selectedYear = ref('')
const selectedMajor = ref('')
const selectedTechnicalDirection = ref('')

// 选项数组
const graduationYears = ref<yearOption[]>([])
const majors = ref<majorOption[]>([])
const technicalDirections = ref<technicalDirectionOption[]>([])

// 筛选条件列表
const friends: Ref<Friend[]> = ref([])
const filteredFriends: Ref<Friend[]> = ref([])

// 初始加载
const loadFriends = async () => {
    try {
        const friendModules = import.meta.glob('../../../src/data/friends/*.json');
        const friendData: Friend[] = [];
        for (const path in friendModules) {
            const module = await friendModules[path]();
            friendData.push(module.default);
        }
        // 这里进行排序处理
        friends.value = friendData.sort((a, b) => a.name.localeCompare(b.name));
        filteredFriends.value = friends.value;
    } catch (error) {
        console.error("加载资源失败", error);
    }
}

// 选择器内数据获取
const getSelectorsData = () => {
    let count = 0;
    const findNewGraduationYears = (friend: Friend) => {
        if (friend.graduationYear && !graduationYears.value.find((item) => { return item.value === friend.graduationYear })) {
            graduationYears.value.push({ value: friend.graduationYear, label: `毕业于 ${friend.graduationYear} 年` });
        }
    }
    const findNewMajors = (friend: Friend) => {
        if (friend.major && !majors.value.find((item) => { return item.value === friend.major })) {
            majors.value.push({ value: friend.major, label: `${friend.major} 专业` });
        }
    }
    const findNewTechnicalDirections = (friend: Friend) => {
        if (friend.technicalDirection && !technicalDirections.value.find((item) => { return item.value === friend.technicalDirection })) {
            technicalDirections.value.push({ value: friend.technicalDirection, label: `${friend.technicalDirection} 方向` });
        }
    }
    for (count; count < friends.value.length; count++) {
        findNewGraduationYears(friends.value[count]);
        findNewMajors(friends.value[count]);
        findNewTechnicalDirections(friends.value[count]);
    }
    // 按年份逆序排序
    graduationYears.value.sort((a, b) => b.value - a.value);
}

// 监测选择器变化
watch([selectedYear, selectedMajor, selectedTechnicalDirection], () => {
    // 过滤数据函数
    const filterFriends = (friend: Friend) => {
        if (selectedYear.value && friend.graduationYear !== parseInt(selectedYear.value)) {
            return false;
        }
        if (selectedMajor.value && friend.major !== selectedMajor.value) {
            return false;
        }
        if (selectedTechnicalDirection.value && friend.technicalDirection !== selectedTechnicalDirection.value) {
            return false;
        }
        return true;
    }
    // 过滤数据
    const newFilteredFriends = friends.value.filter(filterFriends);
    filteredFriends.value = newFilteredFriends;
})

onMounted(async () => {
    await loadFriends();
    getSelectorsData();
})
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
    flex-wrap: wrap;
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
    margin-bottom: 20px;
}

@media (max-width:1080px) {
    #blog-container {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
</style>
