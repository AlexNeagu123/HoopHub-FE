<script lang="ts">
    import {FanBadge} from "$lib/models/user_features/fans/FanBadge";
    import {Avatar, ListBox, ListBoxItem} from "@skeletonlabs/skeleton";
    import type {Team} from "$lib/models/nba_data/teams/Team";
    import {noFavouriteTeamImageUrl, rankColors, rankTexts} from "$lib/constants";
    import {popup} from '@skeletonlabs/skeleton';
    import type {PopupSettings} from '@skeletonlabs/skeleton';

    export let badge: FanBadge;
    export let username: string;
    export let favouriteTeam: Team | null;
    export let availableTeams: Team[];
    export let isOwnProfile: boolean = false;
    export let changesMade: boolean = false;

    let comboboxSelectedValue: number;
    const popupCombobox: PopupSettings = {
        event: 'click',
        target: 'popupCombobox',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };

    function handleSelectTeam() {
        favouriteTeam = comboboxSelectedValue === -1 ? null : availableTeams[comboboxSelectedValue];
        changesMade = true;
    }
</script>

<div>
    <h3 class="h3 font-semibold {rankColors[badge]}">
        {rankTexts[badge]}
    </h3>

    <div class="h1 font-bold flex items-end {rankColors[badge]}">
        {username}
        {#if isOwnProfile}
            <button class="text-center cursor-pointer hover:opacity-40 flex justify-center w-10 mx-1 rounded-md
            bg-surface-400 align-middle items-center" use:popup={popupCombobox}>
                <Avatar width="w-9" rounded="rounded-full" background="bg-transparent"
                        src="{favouriteTeam === null ? noFavouriteTeamImageUrl : favouriteTeam.imageUrl}"/>
            </button>
            <div class="card w-56 shadow-xl text-sm font-normal py-2 variant-filled-primary z-10"
                 data-popup="popupCombobox">
                <div class="h-60 overflow-y-auto">
                    <ListBox rounded="rounded-md">
                        <ListBoxItem bind:group={comboboxSelectedValue} name="medium"
                                     value={-1} on:change={handleSelectTeam}>
                            <p class="mx-2">
                                None
                            </p>
                        </ListBoxItem>
                        {#each availableTeams as optionTeam, index}
                            <ListBoxItem bind:group={comboboxSelectedValue} name="medium"
                                         value={index} on:change={handleSelectTeam}>
                                <div class="flex justify-start">
                                    <Avatar width="w-6" rounded="rounded-full" background="bg-transparent"
                                            src="{optionTeam.imageUrl}"/>
                                    <p class="mx-2">
                                        {optionTeam.fullName}
                                    </p>
                                </div>
                            </ListBoxItem>
                        {/each}
                    </ListBox>
                </div>
                <div class="arrow bg-primary-100-800-token"/>
            </div>
        {:else}
            <div class="text-center cursor-default flex justify-center w-10 mx-1 rounded-md bg-surface-400
            align-middle items-center">
                <Avatar width="w-9" rounded="rounded-full" background="bg-transparent"
                        src="{favouriteTeam === null ? noFavouriteTeamImageUrl : favouriteTeam.imageUrl}"/>
            </div>
        {/if}
    </div>
</div>