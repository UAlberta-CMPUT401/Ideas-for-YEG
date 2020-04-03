#Frontend development documentation

## How to start environment
After running npm install in /frontend,
running the Nuxt instance requires running `npm run dev`.
Additionally, the local backend should be run by calling `./runDevBackend.sh`
in the scripts directory, which can be found in the root of this repo.

## Structure
Most of the structuring follows that of Nuxt.js, and can most directories
and workflows should be found using the Nuxt documentation. A few directories
that are an exception to this is the /constants folder, which is currently used
to store any global constants or helper functions that need to be used across 
components.

## Components
Most components can be found in the components folder, with some of them being
moved into more specific directories to help organize them. The navbar code can
currently be found in the default layout.





