// https://dacs-prd.utshare.utsystem.edu/psc/DACSPRD/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_AGSTARTPAGE_NUI.GBL?CONTEXTIDPARAMS=TEMPLATE_ID%3aPTPPNAVCOL&scname=ADMN_MANAGE_CLASSES&PTPPB_GROUPLET_ID=UTD_SR_MANAGE_CLASSES&CRefName=ADMN_NAVCOLL_22
(() => {
  // Runs on UTD Student Center > Manage My Classes > View My Classes
  const parseEndTime = (time) => {
    const end = time.split('-')[1].trim()
    return new Date(end)
  }

  function getEndDate() {
    const tables = Array.from(document.getElementsByTagName("iframe")).map(iframe => Array.from(iframe.contentDocument.getElementsByTagName("table"))).flat()
    console.log(tables)
    const classesTable = tables.find(table => table.id == "ACE_STDNT_ENRL_SSV2$0")
    const classes = classesTable.firstElementChild.children;
    let latestTime = new Date(0);
    for (const c of classes) {
      if (c.children.length === 1) continue;
      const content = c.children;
      if (content.length === 1) continue;
      const possibleClass = content[1]
      if (possibleClass && possibleClass.children !== 0) {
        const yeah = possibleClass.firstElementChild
        if (!yeah) continue
        const [classNameEl, classDetailsEl] = yeah.firstElementChild.firstElementChild.children
        // will any amount of refactoring save us from this awful, awful markup? hope so, this is the worst code I've ever written. theres maybe at least a way to make this more readable.
        const sessions = Array.from(classDetailsEl.firstElementChild.firstElementChild.firstElementChild.children[2].children[1].firstElementChild.children[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children).slice(1)
        for (const s of sessions) {
          const t = parseEndTime(s.children[7].innerText)
          if (t > latestTime) {
            latestTime = t
          }
        }
      }
    }
    return latestTime
  }

  // Runs on UTD Student Center > Manage My Classes > View My Weekly Schedule
  const goToNextWeek = () => { getElementById("DERIVED_CLASS_S_SSR_NEXT_WEEK").click() }
  const calcHops = (endDate) => {
    let hops = 0;
    let idk = new Date(getElementById("win0divDERIVED_CLASS_S_DESCR100_2", "div").firstElementChild.firstElementChild.firstElementChild.innerText.slice(-10).trim())
    while (idk < endDate) {
      hops++
      idk.setDate(idk.getDate() + 7)
    }
    return hops

  }
  const maxTimestamp = 8640000000000000;
  const getElementById = (id, tagName = "") => {
    let el = document.getElementById(id)
    if (el) return el
    for (const frame of document.getElementsByTagName("iframe")) {
      el = frame.contentDocument.getElementById(id)
      if (el) return el
      if (tagName) {
        els = frame.contentDocument.getElementsByTagName(tagName)
        if (els.length == 0) return el
        for (const el of els) {
          if (el.id == id) {
            return el
          }
        }
      }
    }
    return el
  }
  const DOMSettled = (run) => {
    const begin = performance.now();
    const timeout = 10000
    const main = (whenComplete, reject) => {
      let lastEvent = maxTimestamp
      const observer = new MutationObserver(() => {
        lastEvent = performance.now();
      })
      const wait = (start) => {
        const waitTime = 2500
        const now = performance.now()
        if (lastEvent != maxTimestamp && now - lastEvent > waitTime) {
          console.log(`DOM settled after ${performance.now() - begin}ms`)
          observer.disconnect()
          whenComplete()
          return
        }
        if (performance.now() - start > timeout) {
          if (lastEvent == maxTimestamp) {
            console.log(`DOM was not mutated in ${timeout}ms, continuing...`)
            observer.disconnect()
            whenComplete()
            return
          }
          reject("DOM not settled")
        } else {
          requestAnimationFrame(() => wait(start))
        }
      }
      observer.observe(document, { attributes: true, childList: true, subtree: true })
      for (const iframe of document.getElementsByTagName("iframe")) {
        observer.observe(iframe, { attributes: true, childList: true, subtree: true })
      }

      run()
      wait(performance.now())
    }

    return new Promise((resolve, reject) => {
      main(resolve, reject)
    })

  }

  const clickMenuButton = async (index) => {
    let menu = document.getElementsByTagName("ul")[2]
    const el = menu.children[index].children[1].firstElementChild
    console.log("ABOUT TO CLICK")
    await DOMSettled(() => { el.click(); console.log("Clicked") })
    console.log("DOM DONE!")
  }



  const textExpectedInEl = (el, arr) => {
    for (const text of arr) {
      if (!el.innerText.includes(text)) return false
    }
    return true
  }

  const jsDateToIcalDate = (date) => {
    return date.toISOString().match(/(\d)|([TZ])/g).join("")
  }

  const event = (courseNum, start, end, location, description) => {
    return `\nBEGIN:VEVENT\nSUMMARY:${courseNum}\nDTSTART:${jsDateToIcalDate(start)}Z\nDTEND:${jsDateToIcalDate(end)}Z\nGEO:${location}\nDESCRIPTION:${description}\nEND:VEVENT`
  }


  const timeToObject = (time) => {
    let obj = time.match(/(\d{1,2})/g)
    let [hour, minute] = obj.map((str)=>Number(str))
    if (time.includes("PM")) hour += 12 
    return [
      hour, minute
    ]
  }
  const run = async () => {
    if (!textExpectedInEl(document.body, ["Manage My Classes", "View My Weekly Schedule"])) return alert("Navigate to Orion > UTD Student Center > Manage My Classes > View My Classes, then rerun to continue.")
    if (!confirm("Press OK to begin.")) return
    await clickMenuButton(0)
    const endDate = getEndDate()
    console.log(endDate)
    await clickMenuButton(1)
    const termWeeks = calcHops(endDate)
    getElementById("DERIVED_CLASS_S_SSR_DISP_TITLE", "input").click()
    getElementById("DERIVED_CLASS_S_SHOW_INSTR", "input").click()
    const refreshCalEl = getElementById("DERIVED_CLASS_S_SSR_REFRESH_CAL$38$", "input")
    await DOMSettled(() => refreshCalEl.click())
    let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:v2.jasonaa.me/bookmarklet"
    for (let currentWeek = 0; currentWeek < termWeeks; currentWeek++) {
      const tableBody = getElementById("trSSR_DUMMY_REC$0_row1").firstElementChild.firstElementChild.children[1].firstElementChild.children[2]
      // console.log(tableBody.firstElementChild)
      // first date in the table
      // skip first row - it's the header
      for (let timeSlot = 1; timeSlot < tableBody.children.length; timeSlot++) {
        // console.log(tableBody.firstElementChild.children)
        const thing = tableBody.children[timeSlot]
        // skip first column - it is the time
        for (let column = 1; column < thing.children.length; column++) {
          // console.log("WOAHhHO",tableBody.firstElementChild.children[column])
          const beginning = new Date(`${tableBody.firstElementChild.children[column].childNodes[2].textContent} 2022`)
          beginning.setHours(7)
          const columnEl = thing.children[column]
          // console.log("YUH", columnEl)
          if (columnEl.children.length === 0) continue

          // const td = columnEl.firstElementChild
          // const span = td.firstElementChild
          const span = columnEl.firstElementChild

          // console.log("OWO", span)
          if (span.tagName !== "SPAN") continue
          // console.log("POGGIER")

          // console.log("vibing")
          const nodes = span.childNodes
          console.log(nodes)
          const startDateTime = new Date(beginning)
          // skill issue
          const [startHour, startMinute] = timeToObject(nodes[6].textContent.substring(0,7).trim())
          const [endHour, endMinute] = timeToObject(nodes[6].textContent.slice(-7).trim())
          console.log({startHour, startMinute, endHour, endMinute})
          startDateTime.setHours(startHour, startMinute)
          const endDateTime = new Date(beginning)
          endDateTime.setHours(endHour, endMinute)
          // endDate.setHours(endTime.getHours())
          // endDate.setMinutes(endTime.getMinutes())
          console.log({ beginning, timeSlot, startDateTime, endDateTime })
          ics += event(nodes[0].textContent, startDateTime, endDateTime, nodes[8].textContent, `${nodes[2].textContent} with ${nodes[12].textContent}`)
        }
      }
      await DOMSettled(goToNextWeek)
    }
    ics += "\nEND:VCALENDAR"
    const element = document.createElement("a")
    element.setAttribute(
      "href",
      "data:text/calendar;charset=utf-8," +
      encodeURIComponent(ics)
    )
    element.setAttribute("download", `term_${new Date().toISOString()}.ics`)
    element.click()
  }

  try { run() } catch (e) {
    alert("An unexpected error occurred.");
    console.error(e)
  }
})()


