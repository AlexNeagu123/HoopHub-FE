<script lang="ts">
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import type { PageData } from './$types';
	import ProfilePageInfo from '$lib/models/user_features/fans/ProfilePageInfo';

	import UserProfile from '$lib/components/fans/UserProfile.svelte';
	import UserSettingsList from '$lib/components/fans/UserSettingsList.svelte';

	export let data: PageData;

	let fanInfo: FanInfo = data.fanInfo;
	let ownInfo = new ProfilePageInfo(fanInfo, null, []);;
</script>

<UserProfile bind:ownInfo>
    <UserSettingsList bind:ownInfo/>
</UserProfile>
