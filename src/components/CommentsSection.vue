<script setup lang='ts'>
  import type { Post } from '@/types';
  import { ref, computed } from 'vue';

  type Props = {
    currentPost: Post | null;
  };

  const props = defineProps<Props>();

  const emit = defineEmits(['AddNewComment', 'DeleteComment', 'EditPost', 'DeletePost', 'FormClose']);

  const isCommentAddFormShown = ref(false);
  const isPostEditFormShown = ref(false);

  const commentAuthorName = ref('');
  const commentAuthorEmail = ref('');
  const commentBody = ref('');

  const newPostTitle = ref('');
  const newPostBody = ref('');

  const isCommentsEmpty = computed(() => props.currentPost?.comments.length === 0);

  const handleShowCommentAddForm = () => (isCommentAddFormShown.value = true);
  const handleCloseCommentAddForm = () => (isCommentAddFormShown.value = false);

  const handleSubmitCommentForm = () => {
    emit('AddNewComment', props.currentPost?.id, commentAuthorName.value, commentAuthorEmail.value, commentBody.value);
    handleCloseCommentAddForm();

    commentAuthorName.value = '';
    commentAuthorEmail.value = '';
    commentBody.value = '';
  }

  const handleDeleteComment = (commentId: number) => {
    emit('DeleteComment', props.currentPost?.id, commentId);
  }

  const handleShowPostEditForm = () => {
    isCommentAddFormShown.value = false;
    isPostEditFormShown.value = true;
  }

  const handleClosePostEditForm = () => {
    isPostEditFormShown.value= false;
  }

  const handleEditPost = () => {
    emit('EditPost', props.currentPost?.id, newPostTitle.value, newPostBody.value)

    newPostTitle.value = '';
    newPostBody.value = '';

    handleClosePostEditForm();
  };

  const handleDeletePost = () => {
    emit('DeletePost', props.currentPost?.id);
    emit('FormClose');
  }
</script>

<template>
  <div class='content' v-if='isPostEditFormShown'>
    <h2>Post editing</h2>

    <form @submit.prevent='handleEditPost'>
      <div class='field' data-cy='NameField'>
        <label class='label' for='comment-author-name-title'>Title</label>

        <div class='control has-icons-left has-icons-right'>
          <input
            type='text'
            name='title'
            id='comment-author-name-title'
            placeholder='Post title'
            class='input'
            v-model='newPostTitle'
            required
          />

          <span class='icon is-small is-left'><font-awesome-icon :icon='["fas", "user"]'/></span>
        </div>
      </div>

      <div class='field' data-cy='BodyField'>
        <label class='label' for='comment-body'>Write Post Body</label>

        <div class='control'>
          <textarea id='comment-body' name='body' placeholder='Post body' class='textarea' v-model='newPostBody' required></textarea>
        </div>
      </div>

      <div class='field is-grouped'>
        <div class='control'>
          <button type='submit' class='button is-link'>Save</button>
        </div>

        <div class='control'>
          <button type='reset' class='button is-link is-light' @click='handleClosePostEditForm'>Cancel</button>
        </div>
      </div>
    </form>
  </div>

  <div class='content' v-else>
    <div class='block'>
      <div class='is-flex is-justify-content-space-between is-align-items-center'>
        <h2>{{ `#${props.currentPost?.id}: ${props.currentPost?.title}` }}</h2>

        <div class='is-flex'>
          <span class='icon is-small is-right is-clickable' @click='handleShowPostEditForm'
            ><font-awesome-icon :icon='["fas", "pen-to-square"]' />
          </span>

          <span class='icon is-small is-right has-text-danger is-clickable ml-3' @click='handleDeletePost'>
            <font-awesome-icon :icon='["fas", "trash"]'
          /></span>
        </div>
      </div>

      <p data-cy='PostBody'>{{ props.currentPost?.body }}</p>
    </div>

    <div class='block'>
      <div class='block' v-if='isCommentsEmpty'>
        <p class='title is-4' data-cy='NoCommentsMessage'>No comments yet</p>
      </div>

      <article 
        class='message is-small' 
        data-cy='Comment' 
        v-for='comment of props.currentPost?.comments' 
        :key='comment.id'>
        <div class='message-header'>
          <a :href='`mailto:${comment.email}`' data-cy='CommentAuthor'>{{comment.name}}</a>

          <button
            data-cy='CommentDelete'
            type='button'
            class='delete is-small'
            aria-label='delete'
            @click='handleDeleteComment(comment.id)'
          >
            delete button
          </button>
        </div>

        <div class='message-body' data-cy='CommentBody'>{{comment.body}}</div>
      </article>

      <button
        data-cy='WriteCommentButton'
        type='button'
        class='button is-link'
        v-if='!isCommentAddFormShown'
        @click='handleShowCommentAddForm'
      >
        Write a comment
      </button>

      <form v-else @submit.prevent='handleSubmitCommentForm'>
        <div class='field' data-cy='NameField'>
          <label class='label' for='comment-author-name-name'>Author Name</label>

          <div class='control has-icons-left has-icons-right'>
            <input
              type='text'
              name='name'
              id='comment-author-name-name'
              placeholder='Name Surname'
              class='input'
              v-model='commentAuthorName'
              required
            />

            <span class='icon is-small is-left'
              ><font-awesome-icon :icon='["fas", "user"]'/>
            </span>
          </div>
        </div>

        <div class='field' data-cy='NameField'>
          <label class='label' for='comment-author-name-email'>Author Email</label>

          <div class='control has-icons-left has-icons-right'>
            <input
              type='text'
              name='email'
              id='comment-author-name-email'
              placeholder='Your Email'
              class='input'
              v-model='commentAuthorEmail'
              required
            />

            <span class='icon is-small is-left'
              ><font-awesome-icon :icon='["fas", "envelope"]'/>
            </span>
          </div>
        </div>

        <div class='field' data-cy='BodyField'>
          <label class='label' for='comment-body'>Write Post Body</label>

          <div class='control'>
            <textarea
              id='comment-body'
              name='body'
              placeholder='Comment'
              class='textarea'
              v-model='commentBody'
              required
            ></textarea>
          </div>
        </div>

        <div class='field is-grouped'>
          <div class='control'>
            <button type='submit' class='button is-link'>Add Comment</button>
          </div>

          <div class='control'>
            <button type='reset' class='button is-link is-light' @click='handleCloseCommentAddForm'>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
