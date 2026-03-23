<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center px-6">
    <p class="text-7xl font-bold text-gray-200">404</p>
    <h1 class="mt-4 text-xl font-semibold text-gray-700">ページが見つかりません</h1>
    <p class="mt-2 text-gray-400">お探しの作品は存在しません。</p>
    <RouterLink
      to="/"
      class="mt-8 px-5 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium
             hover:bg-indigo-600 transition-colors duration-150"
    >
      一覧に戻る
    </RouterLink>
  </div>
</template>
