<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div class='bg-gray-700 w-screen h-screen'>
    <div class='flex flex-col h-full py-6 items-center'>
      <div class='text-xl font-bold'>Be my Valentine, Sophia?</div>
      <div class='mb-4'>Things that remind me of our love:</div>
      <div v-show='!walletAddress' @click='connectWallet' class='mb-6 px-6 py-3 bg-pink-400 rounded font-bold text-white cursor-pointer'>Connect Wallet</div>
      <form
      class='mb-4'
      @submit='(event) => {
        event.preventDefault();
        addGif()
        }'
      >
        <input class='h-8 mr-2 rounded text-pink-700 px-2' type="text" v-model='gifInput' placeholder="Enter gif link!" />
        <button type="submit" class="bg-pink-400 rounded text-white font-bold font-lg px-2 py-1">Submit</button>
      </form>
      <div v-for='gif in gifs' :key='gif'>
            <img :src='gif' :alt='gif' />
      </div>
      <div class='flex-1'></div>
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

const TWITTER_HANDLE = 'olrybuilds'
const TEST_GIFS = [
	'https://media.giphy.com/media/S6YrEsT1Q0GIwziT9W/giphy.gif',
	'https://media.giphy.com/media/wf4UuPMYnwBck/giphy.gif',
	'https://media.giphy.com/media/XHgmxw0uZIW5O/giphy.gif'
]

export default {
  name: 'App',
  async mounted () {
    const onLoad = async () => {
      await this.checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  },
  data () {
    return {
      walletAddress: undefined,
      gifs: TEST_GIFS,
      gifInput: ''
    }
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
        const { solana } = window

        if (solana) {
          if (solana.isPhantom) {
            console.log('Phantom wallet found!')

            /*
            * The solana object gives us a function that will allow us to connect
            * directly with the user's wallet!
            */
            const response = await solana.connect({ onlyIfTrusted: true })
            console.log(
              'Connected with Public Key:',
              response.publicKey.toString()
            )

            this.walletAddress = response.publicKey.toString()
          }
        } else {
          alert('Solana object not found! Get a Phantom Wallet 👻')
        }
      } catch (error) {
        console.error(error)
      }
    },
    async connectWallet () {
      const { solana } = window
      if (solana) {
        const response = await solana.connect()
        console.log('Connected with Public Key:', response.publicKey.toString())
        this.walletAddress = response.publicKey.toString()
      }
    },
    addGif () {
      if (this.gifInput.length > 0) {
        console.log('Gif link:', this.gifInput)
        this.gifs = [...this.gifs, this.gifInput]
        this.gifInput = ''
      }
      else 
        console.log('empty input')
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
