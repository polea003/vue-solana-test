<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div class='bg-gray-700 w-screen h-screen'>
    <div class='flex flex-col h-full py-10 items-center'>
      <div class='text-xl font-bold'>Be my Valentine, Sophia?</div>
      <div class='flex-1'>Things that remind me of our love:</div>
      <img class='w-12 h-12' alt="Twitter Logo" src="./assets/twitter-logo.svg"/>
      <a
        :href='twitterLink'
        target="_blank"
        rel="noreferrer"
      >{{`built on @${twitterHandle}`}}</a>
    </div>
  </div>
</template>

<script>

const TWITTER_HANDLE = 'olrybuilds';

export default {
  name: 'App',
  async mounted () {
    const onLoad = async () => {
      await this.checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  },
  computed: {
    twitterHandle () {
      return TWITTER_HANDLE
    },
    twitterLink () {
      return `https://twitter.com/${this.twitterHandle}`
    }
  },
  methods: {
    async checkIfWalletIsConnected () {
      try {
        const { solana } = window;

        if (solana) {
          if (solana.isPhantom) {
            console.log('Phantom wallet found!');
          }
        } else {
          alert('Solana object not found! Get a Phantom Wallet 👻');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ebb1f3;
  /* margin-top: 60px; */
}
</style>
