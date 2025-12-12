<template>
  <div class="page-container">
    <div class="avatar-wrapper">
      <img alt="avatar" class="image" src="/avatar.svg">
    </div>
    <span class="title">HostKite-Note</span>
    <span class="description">Programming Notes</span>
    <span class="tagline">🔥 学如逆水行舟，不进则退！</span>
    <div class="card-container">
      <div class="card-item" v-for="(card, index) in cards" :key="index">
        <h2>{{ card.icon }} {{ card.title }}</h2>
        <p>{{ card.quote }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cards = [
  { icon: '📚', title: '沉淀', quote: '宝剑锋从磨砺出，梅花香自苦寒来。' },
  { icon: '🎯', title: '分享', quote: '问渠那得清如许，为有源头活水来。' },
  { icon: '💻', title: '成长', quote: '不经一番寒彻骨，怎得梅花扑鼻香。' },
  { icon: '💡', title: '学习', quote: '纸上得来终觉浅，绝知此事要躬行。' },
  { icon: '💼', title: '工作', quote: '窗竹影摇书案上，野泉声入砚池中。' },
  { icon: '🌿', title: '生活', quote: '今朝有酒今朝醉，明日愁来明日愁。' }
];
</script>

<style>
:root {
  --vp-card-background: rgba(0, 0, 0, 0.05);
  --vp-card-hover-background: rgba(0, 0, 0, 0.08);
  --vp-card-border: rgba(0, 0, 0, 0.1);
  --avatar-shadow: rgba(0, 0, 0, 0.1);
}

:root.dark {
  --vp-card-background: rgba(255, 255, 255, 0.05);
  --vp-card-hover-background: rgba(255, 255, 255, 0.08);
  --vp-card-border: rgba(255, 255, 255, 0.1);
  --avatar-shadow: rgba(0, 0, 0, 0.3);
}
</style>

<style scoped>
.page-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  padding: 0 48px 60px;
  background: radial-gradient(circle at center, rgba(120, 120, 120, 0.05) 0%, transparent 70%);
  animation: fadeIn 0.8s ease-out;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.image {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  box-shadow:
      0 8px 24px var(--avatar-shadow),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.title {
  font-size: clamp(28px, 8vw, 64px);
  font-weight: 800;
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(120deg, #bd34fe, #41d1ff);
  text-align: center;
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin-bottom: 8px;
}

.description {
  font-size: clamp(24px, 6vw, 60px);
  font-weight: 700;
  text-align: center;
  line-height: 1.2;
  color: rgba(0, 0, 0, 0.7);
}

:root.dark .description {
  color: rgba(255, 255, 255, 0.8);
}

.tagline {
  font-size: clamp(16px, 3vw, 28px);
  margin-top: clamp(10px, 3vh, 38px);
  font-weight: bold;
  color: gray;
  text-align: center;
  max-width: 80%;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 56px;
}

.card-item {
  background-color: var(--vp-card-background);
  padding: 24px 24px 32px;
  border-radius: 16px;
  flex-direction: column;
  display: flex;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: cardAppear 0.6s ease-out;
  animation-fill-mode: backwards;
  backdrop-filter: blur(10px);
  border: 1px solid var(--vp-card-border);
}

.card-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  background-color: var(--vp-card-hover-background);
}

.card-item h2 {
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-item h2::before {
  content: "✦";
  margin-right: 8px;
  font-size: 0.8em;
  color: #bd34fe;
}

.card-item p {
  font-style: italic;
  line-height: 1.6;
  opacity: 0.9;
  text-align: center;
  margin: 0;
  font-size: 18px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardAppear {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.05); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.2; }
}

@media (max-width: 960px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .image {
    width: 192px;
    height: 192px;
  }

  .title {
    font-size: 32px;
  }

  .description {
    font-size: 30px;
    margin-top: 0;
  }

  .tagline {
    margin-top: 10px;
    font-size: 18px;
  }

  .card-container {
    margin-top: 32px;
    gap: 16px;
  }

  .card-item {
    padding: 20px 20px 26px;
  }

  .card-item h2 {
    font-size: 18px;
  }

  .card-item p {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .page-container {
    padding: 0 20px 40px;
  }

  .image {
    width: 160px;
    height: 160px;
  }

  .title {
    font-size: 28px;
  }

  .description {
    font-size: 24px;
  }

  .tagline {
    font-size: 16px;
    margin-top: 8px;
  }

  .card-container {
    margin-top: 24px;
    gap: 12px;
  }

  .card-item {
    padding: 16px;
    gap: 12px;
  }

  .card-item h2 {
    font-size: 16px;
  }

  .card-item p {
    font-size: 14px;
  }
}
</style>
