<template>
  <div class="page-container">
    <img alt="avatar" class="image" src="/avatar.svg">
    <span class="title">HostKite-Note</span>
    <span class="description">Programming Notes</span>
    <span class="tagline">🔥 学如逆水行舟，不进则退！</span>
    <div class="card-container">
      <div class="card-item">
        <h2>📚 沉淀</h2>
        <p>宝剑锋从磨砺出，梅花香自苦寒来。</p>
      </div>
      <div class="card-item">
        <h2>🎯 分享</h2>
        <p>问渠那得清如许，为有源头活水来。</p>
      </div>
      <div class="card-item">
        <h2>💻 成长</h2>
        <p>不经一番寒彻骨，怎得梅花扑鼻香。</p>
      </div>
      <div class="card-item">
        <h2>💡 学习</h2>
        <p>纸上得来终觉浅，绝知此事要躬行。</p>
      </div>
      <div class="card-item">
        <h2>💼 工作</h2>
        <p>窗竹影摇书案上，野泉声入砚池中。</p>
      </div>
      <div class="card-item">
        <h2>🌿 生活</h2>
        <p>今朝有酒今朝醉，明日愁来明日愁。</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style>
:root {
  --vp-card-background: rgba(0, 0, 0, 0.05);
}

:root.dark {
  --vp-card-background: rgba(255, 255, 255, 0.05);
}
</style>
<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  padding: 0 48px 60px;
}

.image {
  width: 240px;
  height: 240px;
}

.title {
  font-size: 64px;
  font-weight: bold;
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(120deg, #bd34fe, #41d1ff);
  text-align: center;
}

.description {
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  margin-top: 24px;
}

.tagline {
  font-size: 28px;
  margin-top: 38px;
  font-weight: bold;
  color: gray;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 56px;
}

.card-item {
  background-color: var(--vp-card-background);
  padding: 24px 24px 32px;
  border-radius: 12px;
  flex-direction: column;
  display: flex;
  gap: 16px;
}

.card-item :first-child {
  font-size: 20px;
}

.card-item :last-child {
  font-size: 18px;
}


@media (max-width: 960px) {
  .card-container {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .card-container {
    width: 100%;
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

  .card-item :first-child {
    font-size: 16px;
  }

  .card-item :last-child {
    font-size: 14px;
  }
}


</style>