<template>
  <div class="lab-list">
    <div class="lab-list-title">
      <span style="font-size: 2rem; font-weight: 600">
        CUIT 实验室/工作室/协会
      </span>
      <span style="font-size: 1rem; color: #666; margin-top: 10px">
        如需加入，请联系Epoch开发实验室~
        <span
          style="
            font-size: 1rem;
            color: #2563eb;
            margin-top: 10px;
            cursor: pointer;
          "
          @click="
            copyToClipboard({
              name: '',
              shortName: '',
              technologyStack: [],
              college: '',
              location: '',
              QQ: '',
              description: '',
              link: '',
            })
          "
        >
          (点击获取格式)
        </span>
      </span>
    </div>
    <div class="labs">
      <div v-for="(lab, index) in labs" :key="index" class="lab-item">
        <div
          class="card"
          :class="{ 'is-flipped': flippedCards[index] }"
          @mouseenter="toggleCard(index)"
          @mouseleave="toggleCard(index)"
        >
          <!-- 卡片正面 -->
          <div class="card-face">
            <div
              class="card-decorator"
              :style="{
                backgroundImage: `url(${getAvatar(lab.QQ)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.1,
                filter: 'blur(5px)',
              }"
            ></div>
            <div class="face-content">
              <div class="avatar-container">
                <img class="avatar" :src="getAvatar(lab.QQ)" alt="" />
                <div class="avatar-ring"></div>
              </div>

              <div class="lab-info">
                <h3 class="lab-name">{{ lab.name }}</h3>
                <p class="lab-desc">{{ lab.description }}</p>
              </div>

              <div class="tech-stack">
                <span
                  v-for="(tech, i) in lab.technologyStack.slice(0, 4)"
                  :key="i"
                  class="tech-badge"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>

          <!-- 卡片反面 -->
          <div class="card-back">
            <div class="back-content">
              <div class="back-header">
                <div
                  class="lab-initials"
                  :style="{ background: getGradient(lab.name) }"
                >
                  {{ lab.shortName || getInitials(lab.name) }}
                </div>
                <h3 class="lab-title">{{ lab.name }}</h3>
              </div>

              <div class="info-container">
                <div class="info-item">
                  <div class="info-icon college-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
                      />
                    </svg>
                  </div>
                  <div class="info-text">
                    <div class="info-label">学院</div>
                    <div class="info-value">{{ lab.college }}</div>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon location-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      />
                    </svg>
                  </div>
                  <div class="info-text">
                    <div class="info-label">位置</div>
                    <div class="info-value">{{ lab.location }}</div>
                  </div>
                </div>

                <div class="info-item qq-item">
                  <div class="info-icon qq-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.003 2c-5.518 0-9.998 4.48-9.998 9.997 0 5.518 4.48 9.998 9.998 9.998 5.517 0 9.997-4.48 9.997-9.998 0-5.517-4.48-9.997-9.997-9.997zm2.53 13.172a.57.57 0 01-.285-.113 7.92 7.92 0 01-.571-.454c-.269.342-.56.674-.866.996a6.64 6.64 0 01-.865.71 2.34 2.34 0 01-.543.287.396.396 0 01-.258-.059.428.428 0 01-.143-.198 1.88 1.88 0 01-.042-.739c.022-.134.056-.265.099-.393.039-.111.094-.243.163-.395a.42.42 0 00.057-.216.326.326 0 00-.072-.175.295.295 0 00-.131-.101 1.103 1.103 0 00-.275-.039l-.566-.029c-.263-.018-.504-.068-.728-.15a1.678 1.678 0 01-.557-.312 1.213 1.213 0 01-.358-.503 1.964 1.964 0 01-.128-.729c0-.312.083-.604.247-.877a2.87 2.87 0 01.612-.732c.25-.21.524-.381.827-.514.178-.078.35-.139.517-.183.166-.042.33-.065.491-.065l.353.007c.122.011.242.030.358.057a2.93 2.93 0 01.572.202c.262.122.495.275.698.459.169.154.295.32.378.498.082.179.124.373.124.582a.86.86 0 01-.081.386.694.694 0 01-.209.262.945.945 0 01-.282.15 2.966 2.966 0 01-.315.097c.162.064.308.141.437.232.128.091.229.198.303.32.072.122.108.265.108.429 0 .132-.023.253-.068.364a.986.986 0 01-.152.265z"
                      />
                    </svg>
                  </div>
                  <div class="info-text">
                    <div class="info-label">QQ群</div>
                    <div
                      class="info-value copy-value"
                      @click="copyToClipboard(lab.QQ)"
                    >
                      {{ lab.QQ }}
                      <div class="copy-indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="decorative-elements">
              <div class="circle circle-1"></div>
              <div class="circle circle-2"></div>
              <div class="circle circle-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义Toast提示 -->
    <Transition name="toast">
      <div v-if="showToast" class="toast">
        <div class="toast-content">
          <svg
            class="toast-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span>{{ toastMessage }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 控制卡片翻转状态
const flippedCards = ref({});

function toggleCard(index) {
  flippedCards.value[index] = !flippedCards.value[index];
}

// Toast提示状态
const showToast = ref(false);
const toastMessage = ref("");

// 显示Toast提示
function showToastMessage(message, duration = 2000) {
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, duration);
}

// 复制到剪贴板功能
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(JSON.stringify(text))
    .then(() => {
      showToastMessage("已复制到剪贴板");
    })
    .catch((err) => {
      console.error("复制失败", err);
      showToastMessage("复制失败，请重试", 3000);
    });
}

// 获取名称首字母
function getInitials(name) {
  if (!name) return "";
  const words = name.split(/\s+/);
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// 基于名称生成固定的渐变色
function getGradient(name) {
  if (!name) return "linear-gradient(135deg, #42b883, #35495e)";

  // 从名称生成哈希值，确保同一名称始终得到相同结果
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // 生成三个颜色用于渐变
  const color1 = `hsl(${Math.abs(hash) % 360}, 70%, 50%)`;
  const color2 = `hsl(${((Math.abs(hash) % 360) + 40) % 360}, 80%, 60%)`;
  const color3 = `hsl(${((Math.abs(hash) % 360) + 80) % 360}, 75%, 45%)`;

  // 返回渐变色
  return `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
}

function getAvatar(qq) {
  return `https://p.qlogo.cn/gh/${qq}/${qq}/640/`;
}

// 实验室数据
const labs = ref([
  {
    name: "Epoch开发实验室",
    shortName: "Epoch",
    technologyStack: ["前端", "后端", "产品"],
    college: "计算机学院",
    location: "5教5202",
    QQ: "834932567",
    description: "专注于Web应用开发和用户体验设计的创新实验室",
    link: "#",
  },
  {
    name: "Syclover-技术小组",
    technologyStack: ["web 安全", "二进制安全", "密码学"],
    college: "网络空间安全学院",
    location: "成都信息工程大学",
    QQ: "299800736",
    description:
      "三叶草小组主要是一群志同道合的伙伴一起学习安全知识，钻研黑客技术，小组致力于成为国内实力强劲和拥有广泛影响力的安全研究团队",
    link: "https://www.sycsec.com/",
  },

  {
    name: "ACM算法实验室",
    technologyStack: ["Java", "Python", "C", "C#"],
    college: "计算机学院",
    location: "双中心 B 座 504 与 511",
    QQ: "758762821",
    description:
      "ACM 实验室，依托程序设计竞赛，旨在培养大学生创新能力、团队精神和在压力下编写程序、分析和解决问题的能力",
    link: "#",
  },
  {
    name: "MetaCrypto实验室",
    technologyStack: ["web", "pwn", "re", "crypto", "合约审计与开发", "move"],
    college: "区块链学院",
    location: "成都信息工程大学",
    QQ: "974922603",
    description:
      "我们积极为 web3 的发展做出贡献，开设与 sui 链共同开设 move 共学营",
    link: "#",
  },
  {
    name: "学生机器人爱好者协会",
    technologyStack: ["硬件", "软件"],
    college: "计算机学院",
    location: "成都信息工程大学",
    QQ: "957230531",
    description:
      "机协是以参加各类学科竞赛为主的科技类社团，在校内主要管理的比赛是全国大学生智能汽车竞赛",
    link: "#",
  },
  {
    name: "Async开发实验室",
    technologyStack: ["前端", "后端", "移动端", "产品"],
    college: "网络空间安全学院",
    location: "双中心 B413",
    QQ: "308022463",
    description:
      " Async 能将一群有着共同目标，共同爱好的你们聚集在一起，创造出大学里最美好的回忆！ Async 希望大家将写代码看作一件快乐无比的事情，希望大家能无悔于大学四年拼搏的汗水！",
    link: "#",
  },
  {
    name: "道格安全研究实验室",
    technologyStack: ["web 安全"],
    college: "网络空间安全学院",
    location: "成都信息工程大学",
    QQ: "966299275",
    description:
      "道格安全研究实验室，致力于为学生提供一个学习、交流和实践的平台，帮助学生掌握前沿的开发技术，提升个人能力",
    link: "",
  },
  {
    name: "非同凡想游戏开发协会",
    technologyStack: ["游戏开发"],
    college: "计算机学院",
    location: "成都信息工程大学",
    QQ: "750598748",
    description: "非同凡想游戏开发协会致力于打造游戏领域的高品质虚拟内容",
    link: "",
  },
  {
    name: "DSA 实验室",
    technologyStack: ["算法", "数据结构"],
    college: "计算机学院",
    location: "成都信息工程大学",
    QQ: "971929215",
    description:
      "DSA 全称 Data Structure & Algorithm（数据结构与算法），是由成都信息工程大学计算机学院建立，以参加各类程序设计竞赛为主的学生团队",
    link: "https://www.yuque.com/books/share/58918979-3466-47fc-a492-e29a78cd5133?#。",
  },
]);
</script>

<style scoped>
.lab-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.lab-list-title {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c3e50;
}

.labs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.lab-item {
  width: 100%;
  perspective: 1000px;
}

.card {
  position: relative;
  width: 100%;
  height: 360px;
  cursor: pointer;
  perspective: 1000px;
}

.card-face,
.card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease;
  backface-visibility: hidden;
}

/* 卡片正面样式 */
.card-face {
  background: white;
  position: absolute;
  z-index: 2;
}

.card.is-flipped .card-face {
  opacity: 0;
  visibility: hidden;
  z-index: 1;
}

.card-decorator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 130px;
  z-index: 1;
}

.face-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.avatar-container {
  position: relative;
  margin-top: 30px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
  z-index: 2;
}

.avatar-ring {
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

.lab-info {
  margin-top: 20px;
  text-align: center;
}

.lab-name {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.lab-desc {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  max-height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.tech-badge {
  background-color: #f5f7fa;
  color: #5f6b7a;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.tech-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 卡片背面样式 */
.card-back {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  position: absolute;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
}

.card.is-flipped .card-back {
  opacity: 1;
  visibility: visible;
  z-index: 2;
}

.back-content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.back-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.lab-initials {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
  margin-right: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.lab-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: rgba(247, 247, 247, 0.8);
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.info-item:hover {
  background: rgba(237, 237, 237, 0.9);
  transform: translateX(5px);
}

.info-icon {
  width: 30px;
  height: 30px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.info-icon svg {
  width: 20px;
  height: 20px;
  fill: white;
}

.college-icon {
  background: linear-gradient(135deg, #4776e6, #8e54e9);
}

.location-icon {
  background: linear-gradient(135deg, #11998e, #38ef7d);
}

.qq-icon {
  background: linear-gradient(135deg, #ff5f6d, #ffc371);
}

.info-text {
  flex: 1;
}

.info-label {
  font-size: 0.7rem;
  color: #888;
  margin-bottom: 2px;
}

.info-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
}

.copy-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.copy-indicator {
  width: 18px;
  height: 18px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.copy-value:hover .copy-indicator {
  opacity: 0.7;
}

.copy-indicator svg {
  width: 100%;
  height: 100%;
  fill: #666;
}

/* 装饰元素 */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
  background: #000;
}

.circle-1 {
  width: 150px;
  height: 150px;
  top: -75px;
  right: -75px;
}

.circle-2 {
  width: 100px;
  height: 100px;
  bottom: 20px;
  left: -50px;
}

.circle-3 {
  width: 50px;
  height: 50px;
  bottom: 50px;
  right: 30px;
}

@media (max-width: 768px) {
  .labs {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  .info-item {
    padding: 8px 12px;
  }

  .info-icon {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
}

/* Toast提示样式 */
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(50, 50, 50, 0.9);
  color: white;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 200px;
  max-width: 90%;
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
}

.toast-icon {
  width: 20px;
  height: 20px;
  fill: #4caf50;
  margin-right: 10px;
  flex-shrink: 0;
}

/* Toast 动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
