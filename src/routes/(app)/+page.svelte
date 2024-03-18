<!--<script>-->
<!--    import { onMount } from "svelte";-->

<!--    const getTeams = async () => {-->
<!--        try {-->
<!--            const res = await fetch("https://localhost:5001/api/v1/nba-data/teams");-->
<!--            if (!res.ok) {-->
<!--                throw new Error("Failed to fetch team data");-->
<!--            }-->
<!--            const data = await res.json();-->
<!--            return data;-->
<!--        } catch (error) {-->
<!--            console.error("Error fetching team data:", error);-->
<!--            return [];-->
<!--        }-->
<!--    }-->

<!--    let teams = [];-->

<!--    onMount(async () => {-->
<!--        teams = await getTeams();-->
<!--        console.log("Teams:", teams); // Log teams after fetching-->
<!--    })-->
<!--</script>-->

