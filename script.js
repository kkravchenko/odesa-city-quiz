document.addEventListener('DOMContentLoaded', () => {
  var input = document.querySelector('#phone')
  var iti = window.intlTelInput(input, {
    initialCountry: 'auto',
    geoIpLookup: (callback) => {
      fetch('https://ipinfo.io/json?token=39633d92f5ff80')
        .then((res) => res.json())
        .then((data) => callback(data.country))
        .catch(() => callback('us'))
    },

    nationalMode: true,
    countrySearch: true,
    autoPlaceholder: 'aggressive',
    strictMode: true,
    loadUtils: () =>
      import(
        'https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.5/build/js/utils.js'
      ),
  })

  setInterval(() => {
    const dropdown = document.querySelector('.iti__dropdown-content')
    if (dropdown && !dropdown.classList.contains('iti__hide')) {
      document.querySelector('.logo-wrapper').style.display = 'none'
      document.querySelector('.action-buttons').style.display = 'none'
    } else {
      document.querySelector('.logo-wrapper').style.display = 'block'
      document.querySelector('.action-buttons').style.display = 'flex'
    }
  }, 200)

  input.addEventListener('countrychange', (e) => {
    e.preventDefault()
    setTimeout(() => document.querySelector('#phone').click(), 200)
  })

  input.addEventListener(
    'open:countrydropdown',
    () =>
      (document.querySelector('.country-dropdown-close').style.display =
        'block')
  )

  document
    .querySelector('.country-dropdown-close')
    .addEventListener('click', (e) => {
      e.preventDefault()
      iti.setDropdownOpen(false)
    })

  var button = document.querySelector('.float-form-consultation')
  var groupId = 1

  button.addEventListener('click', () => {
    if (document.querySelector('.float-form').classList.contains('active')) {
      document.querySelector('.float-form').classList.remove('active')
    } else {
      document.querySelector('.float-form').classList.add('active')
    }
  })

  document.querySelectorAll('.variant-item').forEach((element) =>
    element.addEventListener('click', () => {
      document.querySelector('.float-form-form > .error').style.display = 'none'
      if (!element.classList.contains('selected')) {
        var selected = document.querySelector(
          '.form-block.group' + groupId + ' .variant-item.selected'
        )
        if (selected) {
          selected.classList.remove('selected')
        }

        element.classList.add('selected')
        var fieldName = element.parentNode.dataset.name
        document.querySelector('input[name="' + fieldName + '"]').value =
          element.dataset.type
        document.querySelector('.error').style.display = 'none'
      }
      if (groupId > 1) setTimeout(() => goNext(), 300)
    })
  )

  document.querySelector('#phone').addEventListener('blur', () => {
    document.querySelector('[name="userPhone"]').value = iti.getNumber()
  })

  function goNext() {
    var item = document.querySelector(
      '.form-block.group' + groupId + ' .form-block__variant'
    )

    if (item) {
      var fieldName = item.dataset.name

      if (!document.querySelector('input[name="' + fieldName + '"]').value) {
        document.querySelector('.float-form-form > .error').style.display =
          'flex'
        return
      }
    }
    var nextGroup = groupId + 1
    document.querySelector('.form-wrapper').classList.remove('group' + groupId)

    document.querySelector('.form-wrapper').classList.add('group' + nextGroup)
    document.querySelector('.prev-button').style.display = 'block'
    groupId = nextGroup

    if (groupId === 3) {
      document.querySelector('.next-button').style.display = 'none'
      document.querySelector('.next-button-submit').style.display = 'block'
    }
    if (groupId === 4) {
      document.querySelector('.next-button').style.display = 'block'
      document.querySelector('.next-button').classList.add('close-form')
      document.querySelector('.next-button-submit').style.display = 'none'
      document.querySelector('.prev-button').style.display = 'none'
    }
  }

  document.querySelector('.next-button').addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('close-form')) {
      document.querySelector('.float-form').classList.remove('active')
    } else {
      goNext()
    }
  })

  document.querySelector('.prev-button').addEventListener('click', () => {
    document.querySelectorAll('.error').forEach(function (element) {
      element.style.display = 'none'
    })

    document.querySelector('.form-wrapper').classList.remove('group' + groupId)

    var prevGroup = groupId - 1
    document.querySelector('.form-wrapper').classList.add('group' + prevGroup)
    if (prevGroup === 1)
      document.querySelector('.prev-button').style.display = 'none'
    groupId = prevGroup

    if (groupId === 1) {
      document.querySelectorAll('.error').forEach(function (element) {
        element.style.display = 'none'
      })
    }
    document.querySelector('.next-button').style.display = 'block'
    document.querySelector('.next-button-submit').style.display = 'none'
  })

  document
    .querySelector('.next-button-submit')
    .addEventListener('click', function (event) {
      event.preventDefault()
      var error = false
      if (!document.querySelector('[name="userName"]').value) {
        document.querySelector('[for="name"]').style.display = 'flex'
        error = true
      }
      if (!iti.isValidNumber()) {
        document.querySelector('[for="phone"]').style.display = 'flex'
        error = true
      }
      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          document.querySelector('[name="userEmail"]').value
        )
      ) {
        document.querySelector('[for="email"]').style.display = 'flex'
        error = true
      }

      if (!error) {
        var form = document.querySelector('.tech-form')
        const formData = new FormData(form)
        const data = {}

        formData.forEach((value, key) => {
          if (data[key]) {
            if (!Array.isArray(data[key])) {
              data[key] = [data[key]]
            }
            data[key].push(value)
          } else {
            data[key] = value
          }
        })

        data.createTime = new Date().toISOString()

        fetch('https://hook.eu2.make.com/qnqgds1aqpjo3zlp82q82hohcmkuqv38', {
          method: 'POST',
          headers: {
            'x-make-apikey':
              'G7kP9mX2vR4tY8nL5qW3zA6cB1dF0hJ3mN7pQ9rT2uV5xY8aC4eG6iK1oS3wU7yZ',
            'Access-Control-Allow-Origin': '*',
          },
          body: new URLSearchParams(data),
        })
          .then((res) => {
            if (res.ok) {
              console.log('Лид успешно отправлен на Make.com')
            } else {
              console.log('Ошибка:', res.status, res.statusText)
            }
          })
          .catch((err) => console.error('Ошибка сети:', err))
          .finally(() => goNext())
      }
    })
})
