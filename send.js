const webhookUrl = 'https://hook.eu2.make.com/qnqgds1aqpjo3zlp82q82hohcmkuqv38'

const data = {
  communicationType: 'form',
  connect_type: 'phone',
  createTime: new Date().toISOString(), // или твоя дата
  message: 'Test',
  phone: '068 986 4524',
  projectAddressUk: '',
  projectId: '',
  projectNameUk: '',
  selectedChips: [],
  room_count: '2 кімнати',
  type: 'form',
  userEmail: 'test@x.com',
  userName: 'TEST 18',
  userPhone: '+380689864524',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
}

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'x-make-apikey':
      'G7kP9mX2vR4tY8nL5qW3zA6cB1dF0hJ3mN7pQ9rT2uV5xY8aC4eG6iK1oS3wU7yZ',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((res) => {
    if (res.ok) {
      console.log('Лид успешно отправлен на Make.com')
    } else {
      console.log('Ошибка:', res.status, res.statusText)
    }
  })
  .catch((err) => console.error('Ошибка сети:', err))
