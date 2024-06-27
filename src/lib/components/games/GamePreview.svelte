<script lang="ts">
    import type {Game} from "$lib/models/nba_data/games/Game";
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
    import GamePresentation from "$lib/components/games/GamePresentation.svelte";
	
    export let game: Game | GameWithBoxScore;
    export let hiddenScores: boolean = false;
    export let average: number | null = null;
</script>

<a href="/game?homeTeam={game.homeTeam.apiId}&visitorTeam={game.visitorTeam.apiId}&date={game.date}"
   class="hover:bg-primary-200 cursor-pointer lg:w-[46%] shadow p-5 mx-3 my-5 md:w-full rounded-2xl">
    <GamePresentation hiddenScores={hiddenScores} game={game} {average}/>
</a>