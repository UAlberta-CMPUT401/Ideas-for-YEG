export default function({ store, redirect }) {
  // If the user has a current location picked
  if (store.state.currLocation.currLocation) {
    return redirect(
      `/${store.state.currLocation.currLocation.code}/idea-dashboard`,
    );
  }
}
