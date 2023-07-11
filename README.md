The website and backend of [upnext-gpt](https://github.com/dokar3/upnext-gpt).

# Deploy on Vercel

1. Fork this project.
2. Prepare keys/tokens required by third-party services in the `.env`.
3. Goto [Vercel](https://vercel.com/) and create a new project by importing forked repo.
4. Fill your environment variables, set build command to `npx prisma generate && yarn build` and install command to `yarn`.
5. Deploy.

# License

```
Copyright 2023 dokar3

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```