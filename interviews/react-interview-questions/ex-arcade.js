// https://stackblitz.com/

# Here's the deal...

Our friend Sarah is a budding entrepreneur. She has an idea for a new app called Snapcade. Sarah coded a basic working prototype by herself, but needs help since she's slammed with VC meetings.

**Snapcade** is a simple image hosting site. Anyone can upload an image and in return get a permanent URL for that image. It's a very simple app, but in order for it to work well, it needs to be super intuitive and super fast for any user and device around the world.

Sarah has asked you to help bring her ideas to life. You're free to improve what you can within the next hour. You can focus on anything: performance, app ergonomics, UX, or anything you want. Sarah trusts that whatever you come up with will make Snapcade even better. If she gets funding, maybe she'll ask you to be her CTO ;)

## Snapcade codebase

Snapcade is a basic TypeScript-based Nextjs app. For image storage, Sarah chose to put images into Firebase Storage. Right now, the app does not have a database. There's no need for a database at this stage -- she just needs this to be presentable to VCs (i.e., don't over-engineer it).

## Your job, should you choose to accept it...

You'll pair with another friend (the person you're on this call with) who's trying to learn from you. Don't worry about teaching them everything, but think out loud so they can learn how you're thinking of the problem.

After evaluating the basics of Snapcade, quickly think of what could be improved. Your time is limited, so choose wisely. Once you've decided on what to work on, get started.

You're free to do anything... search Google, install a new module, anything...

## TODO

- Make it better!

### Ultimate goal

- Show to VCs

### Users

- Who is going to use it?
  Anyone in the internet, public, consumer base
  Regular consumers, not tech savvy
- What for
  Share images, like imgur

### Use cases

- Upload and share images
- See images I uploaded before
- Easy to upload files - drag and drop, copy/paste
- Keep metadata of the images, careful about location data
-

### Technical Constrains

- Filetypes: most common: jpeg, gifs, png; No video
- File size limits: 10MB
- Bot detection, or limitation of
- Unlimited service
-

### Issues

- Make it easy to share for non tech savvy users

* Add "Grab link" √

- Visually - no branding, no visual identity, not identifiable
  ArcadeImages

- Visual feedback when uploading ~
- Progress blinked and dissapeared √

- See image detail when clicking on it √

  - Include metadata

- Error messages for network issues, server errors

- Logo click area is the whole row

// index

import { useCallback, useContext, useState } from 'react'

import { AppStateContext } from '../src/AppStateContext'
import { ImageViewer } from '../src/components/ImageViewer'
import { Layout } from '../src/components/Layout'
import { UploadForm } from '../src/components/UploadForm'

const UPLOADING_MESSAGE = 'Uploading image...'
const ERROR_UPLOADING_MESSAGE =
  'Error Uploading image; Please check your connection!'

export default function Home() {
  const { appState, setAppState } = useContext(AppStateContext)
  const [uiMessage, setUIMessage] = useState(null)

  const onUploadStart = useCallback(() => {
    setAppState(state => {
      return { ...state, snapUrl: undefined, snapFilename: undefined }
    })
    setUIMessage(UPLOADING_MESSAGE)
  }, [setAppState])

  const onUploadComplete = useCallback(
    (url: string, filename: string) => {
      setAppState(state => {
        return {
          ...state,
          snapUrl: url,
          snapFilename: filename,
        }
      })
      setUIMessage('')
    },
    [setAppState]
  )

  return (
    <Layout>
      {uiMessage && <div className='message-toast'>{uiMessage}</div>}
      <UploadForm
        onUploadStart={onUploadStart}
        onUploadComplete={onUploadComplete}
        onUploadFail={() => {
          setUIMessage(ERROR_UPLOADING_MESSAGE)
        }}
      />
      <div className='uploaded-image-container'>
        <ImageViewer url={appState.snapUrl} filename={appState.snapFilename} />
      </div>
    </Layout>
  )
}

// Layout
import Head from 'next/head'
import Link from 'next/link'

export function Layout({ children }) {
  return (
    <div className='w-4/5 mx-auto'>
      <Head>
        <title>Snapcade</title>
      </Head>

      <main className='pt-5 pb-10'>
        <Link href='/'>
          <h1 className='text-3xl my-4'>Snapcade</h1>
        </Link>
        <p>Welcome to Snapcade -- the next generation photo sharing site</p>


        <section className='flex flex-col gap-4'>{children}</section>
      </main>
    </div>
  )
}

// UploadForm
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'

import { uploadBlobToFirebaseStorage } from '../firebase'

type Props = {
  onUploadStart: () => void
  onUploadComplete: (url: string, filename: string) => void
  onUploadFail: () => void
}

export function UploadForm({
  onUploadStart,
  onUploadComplete,
  onUploadFail,
}: Props) {
  const uploadFile = useCallback(
    async evt => {
      onUploadStart()
      const file: File = evt.target?.files?.[0]
      if (file) {
        let extension = ''
        if (file.type === 'image/jpeg') {
          extension = 'jpeg'
        } else if (file.type === 'image/png') {
          extension = 'png'
        } else if (file.type === 'image/gif') {
          extension = 'gif'
        } else if (file.type === 'image/webp') {
          extension = 'webp'
        }

        const filename = nanoid()

        let fileUrl
        try {
          fileUrl = await uploadBlobToFirebaseStorage(
            file,
            'snaps',
            filename,
            extension
          )
          onUploadComplete(fileUrl, `${filename}.${extension}`)
        } catch (e) {
          onUploadFail()
        }
      }
    },
    [onUploadComplete, onUploadStart]
  )

  return (
    <div className='mt-4'>
      <input
        type='file'
        className='file-input file-input-bordered w-full max-w-xs'
        accept='image/png, image/jpeg, image/webp, image/gif'
        onChange={uploadFile}
      />
    </div>
  )
}


// app
import '../styles/globals.css'

import { useState } from 'react'

import { AppState, AppStateContext } from '../src/AppStateContext'

function MyApp({ Component, pageProps }) {
  const [appState, setAppState] = useState<AppState>({})

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      <Component {...pageProps} />
    </AppStateContext.Provider>
  )
}

export default MyApp

//IMageViewer
import Link from 'next/link'

type Props = {
  filename: string
  url: string
}

export function ImageViewer({ filename, url }: Props) {
  return (
    url && (
      <div className='border boder-gray-700 rounded-lg overflow-hidden shadow-lg'>
        <Link href={`/${filename}`} legacyBehavior>
          <a title='See the detail'>
            <img src={url} className='w-full image' alt='Snap' />
          </a>
        </Link>
      </div>
    )
  )
}

// [filename].js
import { ImageViewer } from '../src/components/ImageViewer'
import { Layout } from '../src/components/Layout'
import { useState } from 'react'

type Props = {
  filename: string
}

export default function SnapPage({ filename }: Props) {
  const url = `https://firebasestorage.googleapis.com/v0/b/dev-coding-test.appspot.com/o/snaps%2F${filename}?alt=media`
  const [uiMessage, setUIMessage] = useState(null)

  function setClipboard(text) {
    const type = 'text/plain'
    const blob = new Blob([text], { type })
    const data = [new ClipboardItem({ [type]: blob })]

    navigator.clipboard.write(data).then(
      () => {
        console.log('copy success!')
        setUIMessage('copy success!')
        /* success */
      },
      () => {
        console.log('copy error!')
        /* failure */
      }
    )
  }

  const handleGrabLink = () => {
    console.log('grab link!')
    setClipboard(url)
  }

  return (
    <Layout>
      {uiMessage && <div className='message-toast'>{uiMessage}</div>}
      <div className='container'>
        <section className='my-4'>
          <ImageViewer url={url} filename={filename} />
        </section>
        <section className='sidebar'>
          <button
            type='button'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleGrabLink}
          >
            Grab Link
          </button>
        </section>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: { filename: query.filename },
  }
}




// globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: white;
}

.container {
  display: flex;
}
.main {
  padding: 1em;
}
.sidebar {
  padding: 1em;
}
.message-toast {
  width: 30vw;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  border-radius: 1em;
}
.uploaded-image-container {
  width: 30%;
}
.uploaded-image-container .image:hover {
  opacity: 0.7;
}
