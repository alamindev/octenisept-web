/**
 * import
 */
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')

// config
const configFilePath = path.resolve(__dirname, '../webspecial.config.json')
const publishedPagesKey = 'publishedPages'

/**
 * find out if page is already published by getting the id for a specific file
 */
const readPublishedPageId = (portal, file) => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'))
    const publishedPage = config[publishedPagesKey][portal]?.find(
      (el) => el.file === file
    )
    return publishedPage ? publishedPage.pageId : null
  } catch (e) {
    console.error(e)
    process.exit()
  }
}

/**
 * write file and published-id to config for future reference
 */
const writePublishedPageId = (portal, file, pageId) => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'))

    // make sure the portal key is present
    if (!(portal in config[publishedPagesKey])) {
      config[publishedPagesKey][portal] = []
    }

    // if file is already present just change the id otherwise push to array
    if (config[publishedPagesKey][portal].find((el) => el.file === file)) {
      config[publishedPagesKey][portal].map((el) => {
        if (el.file === file) el.pageId = pageId
      })
    } else {
      config[publishedPagesKey][portal].push({ file, pageId })
    }

    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2))
  } catch (e) {
    console.error(e)
    process.exit()
  }
}

/**
 * some questions for the user
 */
const askQuestions = () => {
  const questions = []

  questions.push({
    type: 'number',
    name: 'pageId',
    message: 'Wie lautet die ID der Seite (leer lassen für neue Seite)?'
  })

  questions.push({
    type: 'input',
    name: 'name',
    message: 'Wie soll der Titel der Seite lauten?',
    when: (answers) => !answers.pageId,
    validate: (answer) => answer.length > 0,
    default: 'webspecial'
  })

  return inquirer.prompt(questions)
}

/**
 * set content on remote server
 */
const setContent = async (
  content_page_id,
  name,
  body,
  portal = 'gesundleben'
) => {
  const parent_ids = {
    gesundleben: '200849',
    alphega: '220849'
  }

  let response
  const endpoint = 'https://www.gesundleben-apotheken.de/api/content/set?token=niEjaSgbQS6VieNUEZk7wxHW32LS6WXK6c9wvfMFj5KnPn7xgItI'

  try {
    response = await axios.post(
      endpoint,
      {
        content_page_id,
        name,
        body,
        parent_id: parent_ids[portal]
      },
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
        }
      }
    )
  } catch (e) {
    console.error(e.response.data)
    process.exit()
  }

  return response
}

const run = async () => {
  const distDirectory = path.resolve(__dirname, '../../dist')
  const files = fs.readdirSync(distDirectory)
  let index = 1

  const portalAnswers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'portals',
      message: 'Auf welchen Portalen soll die Seite veröffentlicht werden?',
      choices: [
        {
          name: 'Alphega',
          value: 'alphega'
        },
        {
          name: 'gesund leben',
          value: 'gesundleben'
        }
      ],
      default: ['gesundleben', 'alphega']
    }
  ])

  for (const file of files) {
    console.log(
      chalk.green(
        `Webspecial veröffentlichen (${file} - Seite: ${index}/${files.length})`
      )
    )
    index++

    const body = fs.readFileSync(path.join(distDirectory, file), 'utf-8')

    // api request
    for (const portal_key in portalAnswers.portals) {
      const portal = portalAnswers.portals[portal_key]
      // check if page is already published and get data
      const publishedPageId = readPublishedPageId(portal, file)

      // ask questions
      const answers = !publishedPageId && (await askQuestions(publishedPageId))
      const selectedPageId = publishedPageId || answers.pageId
      const pageName = answers.name || null

      const response = await setContent(selectedPageId, pageName, body, portal)
      const responsePageId = response.data.content_page_id

      // write response page id to config
      if (responsePageId) {
        try {
          writePublishedPageId(portal, file, responsePageId)
          console.log(
            'https://www.gesundleben-apotheken.de/content/' + responsePageId
          )
        } catch (e) {
          console.error(`Cannot write to file ${e}`)
          process.exit()
        }
      } else {
        console.error('No content page id could be found')
        console.log(response.data)
        process.exit()
      }
    }
  }
}

run()
