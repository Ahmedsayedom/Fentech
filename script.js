function startGame() {
  const loader = document.getElementById("loader")
  const frontBtn = document.querySelector(".front")
  frontBtn.classList.add("glitching")
  loader.classList.remove("hidden")
  setTimeout(() => {
    frontBtn.classList.remove("glitching")

    document.querySelectorAll("body > div").forEach(div => {
      if (div !== loader) div.classList.add("hidden")
    })

    loader.classList.add("hidden")
    document.getElementById("video-page").classList.remove("hidden")
    let video = document.getElementById("intro-video")
    video.play().catch(e => {
      console.warn("Video play failed:", e)
    })
    setTimeout(() => {
      document.getElementById("video-page").classList.add("hidden")
      document.getElementById("form-page").classList.remove("hidden")
    }, 38000)
  }, 5000)
}

function resetGame() {
  localStorage.clear()
  document.querySelector(".profile-icon").innerHTML = "👤"
  document
    .querySelectorAll("body > div")
    .forEach(div => div.classList.add("hidden"))
  document.getElementById("start-page").classList.remove("hidden")
} 

function submitForm() {
  const data = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
  }
  localStorage.setItem("profileData", JSON.stringify(data))
  goTo("home")
}

function goTo(page) {
  document
    .querySelectorAll("body > div")
    .forEach(div => div.classList.add("hidden"))

  if (page === "home") {
    document.getElementById("home-page").classList.remove("hidden")
  } else if (page === "profile") {
    const data = JSON.parse(localStorage.getItem("profileData")) || {}
    const profileText = `Name: ${data.name || ""} ${
      data.surname || ""
    }<br>DOB: ${data.dob || ""}<br>Gender: ${data.gender || ""}`
    document.getElementById("profile-data").innerHTML = profileText

    const altImageSrc = localStorage.getItem("profileImageAlt")
    const altContainer = document.getElementById("profile-image-alt-container")
    if (altImageSrc) {
      altContainer.innerHTML = `<img src="${altImageSrc}" alt="Alternate Profile Image">`
    } else {
      altContainer.innerHTML = ""
    }

    document.getElementById("profile-page").classList.remove("hidden")
  } else if (page === "start") {
    resetGame()
  } else if (page === "form-page") {
    document.getElementById("form-page").classList.remove("hidden")
  } else {
    alert(`${page} page not implemented yet.`)
    document.getElementById("home-page").classList.remove("hidden")
  }
}

function selectProfileImage(src, srcAlt) {
  localStorage.setItem("profileImage", src)
  localStorage.setItem("profileImageAlt", srcAlt)

  document.querySelector(
    ".profile-icon"
  ).innerHTML = `<img src="${src}" style="width: 60px; height: 60px; border-radius: 50%;">`

  document.querySelectorAll(".profile-option").forEach(el => {
    el.classList.remove("selected")
  })

  // Find the img with the matching src
  const clickedImg = Array.from(
    document.querySelectorAll(".profile-option")
  ).find(img => img.src === src)
  if (clickedImg) {
    clickedImg.classList.add("selected")
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const selectedProfileImage = localStorage.getItem("profileImage")
  if (selectedProfileImage) {
    document.querySelector(
      ".profile-icon"
    ).innerHTML = `<img src="${selectedProfileImage}" style="width: 70px; height: 70px; border-radius: 50%;">`
  }
})
