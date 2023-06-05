<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import AddPostForm from './components/AddPostForm.vue';
  import AppHeader from './components/AppHeader.vue';
  import PostList from './components/PostList.vue';
  import CommentsSection from './components/CommentsSection.vue';
  import type { Post } from './types';

  const isAddFormOpen = ref(false);
  const currentPost = ref<Post | null>(null);
  const isCommentsSectionShown = ref(false);

  const posts = ref<Post[]>([]);

  let nextPostId = 1;
  let nextCommentId = 1;

  const handleToggleForm = () => {
    isAddFormOpen.value = true;
    isCommentsSectionShown.value = false;
    currentPost.value = null;
  };

  const handleCloseForm = () => {
    isAddFormOpen.value = false;
    currentPost.value = null;
  };

  const handleAddPost = (title: string, body: string) => {
    const newPost = {
      id: nextPostId++,
      title,
      body,
      comments: []
    };

    posts.value.push(newPost);
    currentPost.value = newPost;

    isCommentsSectionShown.value = true;

    savePosts();
  };

  const handleToggleComments = (postId: number) => {
    if (currentPost.value?.id === postId) {
      currentPost.value = null;
      isAddFormOpen.value = false;
    } else {
      currentPost.value = posts.value.find((post) => post.id === postId) ?? null;
      isCommentsSectionShown.value = true;
      isAddFormOpen.value = true;
    }
  };

  const handleAddCommentToPost = (postId: number, name: string, email: string, body: string) => {
    const foundPost = posts.value.find((post) => post.id === postId) ?? null;

    const newComment = {
      id: nextCommentId++,
      name,
      email,
      body
    };

    foundPost?.comments.push(newComment);

    savePosts();
  };

  const handleDeleteCommentFromPost = (postId: number, commentId: number) => {
    const foundPost = posts.value.find((post) => post.id === postId) ?? null;

    if (foundPost) {
      foundPost.comments = foundPost.comments.filter((comment) => comment.id !== commentId);
    }

    savePosts();
  };

  const handleEditPost = (postId: number, newTitle: string, newBody: string) => {
    const foundPostIndex = posts.value.findIndex((post) => post.id === postId);

    if (foundPostIndex !== -1) {
      posts.value[foundPostIndex] = {
        ...posts.value[foundPostIndex],
        title: newTitle,
        body: newBody,
      };
    }

    if (currentPost.value?.id === postId) {
        currentPost.value = posts.value[foundPostIndex];
      }

    savePosts();
  }

  const handleDeletePost = (postId: number) => {
    posts.value = posts.value.filter(post => post.id !== postId)

    savePosts();
  }

  const savePosts = () => {
    localStorage.setItem('posts', JSON.stringify(posts.value));
  };

  const retrievePosts = () => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      posts.value = JSON.parse(savedPosts);
    }
  };

  onMounted(() => {
    retrievePosts();
  });
</script>

<template>
  <AppHeader />

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostList
          :isAddFormOpen="isAddFormOpen"
          @FormOpen="handleToggleForm"
          @FormClose="handleCloseForm"
          @ToggleComments="handleToggleComments"
          :posts="posts"
          :isCommentsSectionShown="isCommentsSectionShown"
          :currentPost="currentPost"
        />

        <div
          class="tile is-parent is-8-desktop Sidebar"
          :class="{ 'Sidebar--open ': isAddFormOpen}"
        >
          <div class="tile is-child box is-success">
            <AddPostForm
              :class="{'is-invisible is-hidden': !isAddFormOpen}"
              v-if="!isCommentsSectionShown"
              @FormClose="handleCloseForm"
              @AddNewPost="handleAddPost"
            />

            <CommentsSection
              v-else
              :class="{'is-invisible': !isAddFormOpen}"
              :currentPost="currentPost"
              @AddNewComment="handleAddCommentToPost"
              @DeleteComment="handleDeleteCommentFromPost"
              @EditPost="handleEditPost"
              @DeletePost="handleDeletePost"
              @FormClose="handleCloseForm"
            />

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .Sidebar {
    overflow: hidden;
    opacity: 0;
    transition-property: max-width, opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;

    @media (min-width: 769px) {
      max-width: 0;
    }
  }

  .Sidebar--open {
    opacity: 1;

    @media (min-width: 769px) {
      max-width: 50%;
    }
  }
</style>
