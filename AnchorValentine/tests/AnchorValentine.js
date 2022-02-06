// const anchor = require('@project-serum/anchor');

// describe('AnchorValentine', () => {

//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.Provider.env());

//   it('Is initialized!', async () => {
//     // Add your test here.
//     const program = anchor.workspace.AnchorValentine;
//     const tx = await program.rpc.initialize();
//     console.log("Your transaction signature", tx);
//   });
// });


const anchor = require('@project-serum/anchor');

const main = async() => {
  console.log("🚀 Starting test...")

  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.AnchorValentine;
  const tx = await program.rpc.initialize();

  console.log("📝 Your transaction signature", tx);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();