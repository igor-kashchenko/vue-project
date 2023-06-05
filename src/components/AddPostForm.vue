<script setup lang='ts'>
  import { ref } from 'vue';

  const newTitle = ref('');
  const newBody = ref('');

  const emit = defineEmits(['FormClose', 'AddNewPost']);

  const closeAddPost = () => {
    emit('FormClose');
  };

  const addPost = () => {
    emit('AddNewPost', newTitle.value, newBody.value);

    newTitle.value = '';
    newBody.value = '';
  };
</script>

<template>
  <div class='content'>
    <h2>Create new post</h2>

    <form @submit.prevent='addPost'>
      <div class='field' data-cy='NameField'>
        <label class='label' for='comment-author-name-title'>Title</label>

        <div class='control has-icons-left has-icons-right'>
          <input
            type='text'
            name='title'
            id='comment-author-name-title'
            placeholder='Post title'
            class='input'
            required
            v-model='newTitle'
          />

          <span class='icon is-small is-left'>
            <font-awesome-icon :icon='["fas", "user"]' />
          </span>
        </div>
      </div>

      <div class='field' data-cy='BodyField'>
        <label class='label' for='comment-body'>Write Post Body</label>

        <div class='control'>
          <textarea
            id='comment-body'
            name='body'
            placeholder='Post body'
            class='textarea'
            required
            v-model='newBody'
          ></textarea>
        </div>
      </div>

      <div class='field is-grouped'>
        <div class='control'>
          <button type='submit' class='button is-link'>Create</button>
        </div>

        <div class='control'>
          <button type='reset' class='button is-link is-light' @click='closeAddPost'>Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>
