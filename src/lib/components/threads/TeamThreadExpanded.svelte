<script lang="ts">
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import type { TeamThread } from '$lib/models/user_features/threads/TeamThread';
	import { currentUser } from '$lib/stores/auth.store';
	import TeamThreadFullView from './TeamThreadFullView.svelte';
	import {
		Modal,
		getModalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import ModalForm from '$lib/components/threads/TeamThreadModalForm.svelte';
	import { page } from '$app/stores';
	import updateTeamThread from '$lib/services/user_features/threads/updateTeamThread';
	import DeleteModal from '../shared/DeleteThreadModal.svelte';
	import Comment from '../comments/Comment.svelte';
	import WriteCommentContainer from '../comments/WriteCommentContainer.svelte';

	export let teamThread: TeamThread;
	export let team: Team;

	const modalStore = getModalStore();
	const modalRegistry: Record<string, ModalComponent> = {
		formModal: { ref: ModalForm },
		deleteModal: { ref: DeleteModal }
	};

	const id = $page.params.id;

	const updateModal: ModalSettings = {
		type: 'component',
		component: 'formModal',
		title: 'Update the thread',
		body: 'Change the fields and update the existing thread..',
		meta: {
			operationId: id,
			title: teamThread.title,
			content: teamThread.content,
			submitFormHandler: updateTeamThread
		}
	};

	const deleteModal: ModalSettings = {
		type: 'component',
		component: 'deleteModal',
		title: 'Confirm Deletion',
		body: 'Are you sure you wish to delete the thread?',
		meta: {
			id: id,
			teamId: team.id
		}
	};

	function triggerDeleteThreadModal() {
		modalStore.trigger(deleteModal);
	}

	function triggerUpdateThreadModal() {
		modalStore.trigger(updateModal);
	}

	let rootCommentAdded: boolean = false;

	function toggleAddRootComment() {
		rootCommentAdded = !rootCommentAdded;
	}
</script>

<div class="flex justify-center">
	<div class="flex flex-col items-center w-2/3">
		<TeamThreadFullView
			title={teamThread.title}
			author={teamThread.fan}
			time={teamThread.createdDate}
			content={teamThread.content}
			upvotes={teamThread.upVotes}
			downvotes={teamThread.downVotes}
			id={teamThread.id}
			threadVoteStatus={teamThread.voteStatus}
			{team}
		/>
		<div class="card variant-filled-surface flex  border-b-2 border-primary-400 w-full justify-between">
			<button
				class="btn btn-primary hover:variant-filled-secondary items-center rounded-md"
				on:click={toggleAddRootComment}>Add a comment</button
			>
			{#if teamThread.fan.id === $currentUser.userId}
				<div>
					<button
						class="btn btn-primary hover:variant-filled-warning items-center rounded-md"
						on:click={triggerUpdateThreadModal}>Edit</button
					>
					<button
						class="btn btn-primary hover:variant-filled-error items-center rounded-md"
						on:click={triggerDeleteThreadModal}>Delete</button
					>
				</div>
			{/if}
		</div>
        {#if rootCommentAdded}
            <WriteCommentContainer active={rootCommentAdded}/>
        {/if}
		<Comment commenter={teamThread.fan} />
		<Comment commenter={teamThread.fan} />
		<Comment commenter={teamThread.fan} />
		<Comment commenter={teamThread.fan} />
	</div>
</div>

<Modal components={modalRegistry} />
