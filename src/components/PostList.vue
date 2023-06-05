<script setup lang='ts'>
  import { computed } from 'vue';
  import type { Post } from '../types';

  type Props = {
    isAddFormOpen: boolean;
    isCommentsSectionShown: boolean;
    posts: Post[];
    currentPost: Post | null;
  };

  const props = defineProps<Props>();

  const emit = defineEmits(['FormOpen', 'ToggleComments']);

  const openForm = () => emit('FormOpen');
  const toggleComments = (postId: number) => emit('ToggleComments', postId);

  const isPostsEmpty = computed(() => props.posts.length === 0);
</script>

<template>
    <div class='tile is-parent'>
      <div class='tile is-child box is-success'>
        <div class='block'>
          <div class='block is-flex is-justify-content-space-between'>
            <h2 class='title'>Posts</h2>

            <button
              type='button'
              class='button is-link'
              :class="{ 'is-light': props.isAddFormOpen && !props.isCommentsSectionShown }"
              @click='openForm'
            >
              Add New Post
            </button>
          </div>

          <h3 class='mt-2 has-text-centered' v-if='isPostsEmpty'>No posts yet.</h3>

          <table class='table is-fullwidth is-striped is-hoverable is-narrow' v-else>
            <thead>
              <tr class='has-background-link-light'>
                <th>ID</th>
                <th>Title</th>
                <th class='has-text-right'>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for='{ id, title } of props.posts' :key='id'>
                <td>{{ id }}</td>
                <td>{{ title }}</td>
                <td class='has-text-right is-vcentered'>
                  <button type='button' class='button is-link' :class="{'is-light': props.currentPost?.id !== id}" @click='toggleComments(id)'>
                    {{props.currentPost?.id === id ? 'Close' : 'Open'}}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>
