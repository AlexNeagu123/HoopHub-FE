<script lang="ts">
    import {AppBar, Avatar} from "@skeletonlabs/skeleton";
    import {currentUser} from "$lib/stores/auth.store";
    import {AppRoute, SeasonConstants} from "$lib/constants";
    import {seasonFromIntToStr} from "$lib/utils/standings-utils";
    import Inbox from "$lib/components/icons/Inbox.svelte";

    import {popup} from '@skeletonlabs/skeleton';
    import type {PopupSettings} from '@skeletonlabs/skeleton';
    import Profile from "$lib/components/icons/Profile.svelte";
    import Settings from "$lib/components/icons/Settings.svelte";
    import LogOut from "$lib/components/icons/LogOut.svelte";
    import UserIconLink from "$lib/components/fans/UserIconLink.svelte";
    import type FanInfo from "$lib/models/user_features/fans/FanInfo";

    const fanPopUp: PopupSettings = {
        event: 'click',
        target: 'fanPopUp',
        placement: 'bottom',
    };

    export let fanInfo: FanInfo;
    console.log(fanInfo.avatarPhotoUrl);
</script>

<style>
    .avatar:hover {
        filter: brightness(105%);
        transition: filter 0.3s ease;
    }
</style>

<AppBar background="bg-surface-500" border="border border-solid border-surface-600 border-t-0">
    <svelte:fragment slot="lead">
        <div></div>
    </svelte:fragment>
    <svelte:fragment>
        <div class="flex justify-evenly">
            <a type="button" class="btn variant-filled-surface text-xl" href="{AppRoute.TEAMS}">Teams</a>
            <a type="button" class="btn variant-filled-surface text-xl" href="{AppRoute.GAMES}">Games</a>
            <a type="button" class="btn variant-filled-surface text-xl"
               href="{AppRoute.STANDINGS}?season={seasonFromIntToStr(SeasonConstants.currentSeason)}">
                Standings
            </a>
            <a type="button" class="btn variant-filled-surface text-xl"
               href="{AppRoute.PLAYOFFS}?season={seasonFromIntToStr(SeasonConstants.currentSeason - 1)}">
                Playoffs
            </a>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        {#if $currentUser.isLoggedIn}
            <div class="w-14 h-14 rounded-full bg-primary-200 flex items-center justify-center cursor-pointer avatar">
                <div class="w-1/2">
                    <Inbox/>
                </div>
            </div>

            <div class="w-14 h-14 rounded-full bg-primary-200 flex items-center justify-center cursor-pointer avatar"
                 use:popup={fanPopUp}>
                <Avatar src="{fanInfo.avatarPhotoUrl}"
                        width="w-12" height="h-12" rounded="rounded-full" background="bg-transparent"/>
            </div>

            <div class="card variant-filled-surface p-4 shadow-xl" data-popup="fanPopUp">
                <p class="font-semibold my-2 p-2 shadow-sm">{fanInfo.username}</p>

                <UserIconLink link="{AppRoute.PROFILE}/{fanInfo.id}" linkText="Profile">
                    <Profile/>
                </UserIconLink>

                <UserIconLink link="aaa" linkText="Settings">
                    <Settings/>
                </UserIconLink>

                <UserIconLink link="{AppRoute.LOGOUT}" linkText="Logout">
                    <LogOut/>
                </UserIconLink>

            </div>

        {:else}
            <a type="button" class="btn variant-filled-surface text-xl" href="{AppRoute.LOGIN}">Login</a>
        {/if}
    </svelte:fragment>
</AppBar>
