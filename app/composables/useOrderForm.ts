/**
 * Логика формы заявки: валидация, состояние отправки и запрос на /api/order.
 */

export type OrderStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface OrderForm {
  name: string
  contact: string
  email: string
  topic: string
  budget: string
  message: string
  consent: boolean
  /** Honeypot: скрытое поле для отсечения ботов */
  website: string
}

export const ORDER_TOPICS = [
  { value: 'telegram-bot', label: 'Чат-бот для Telegram' },
  { value: 'max-bot', label: 'Чат-бот для MAX' },
  { value: 'web-app', label: 'Веб-приложение / кабинет' },
  { value: 'integration', label: 'Интеграции и API' },
  { value: 'support', label: 'Поддержка и доработки' },
  { value: 'other', label: 'Другое' },
]

export const ORDER_BUDGETS = [
  { value: '', label: 'Не определён' },
  { value: '50-100k', label: '50 000 – 100 000 ₽' },
  { value: '100-300k', label: '100 000 – 300 000 ₽' },
  { value: '300k+', label: 'от 300 000 ₽' },
  { value: 'discuss', label: 'Хочу обсудить' },
]

type Errors = Partial<Record<keyof OrderForm, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
/** @username или +7 (999) 123-45-67 */
const CONTACT_RE = /^(@[\w.]{3,}|[\d\s()+\-]{7,})$/

const emptyForm = (): OrderForm => ({
  name: '',
  contact: '',
  email: '',
  topic: '',
  budget: '',
  message: '',
  consent: false,
  website: '',
})

function validate(form: OrderForm): Errors {
  const errors: Errors = {}

  if (form.name.trim().length < 2) errors.name = 'Как к вам обращаться?'
  else if (form.name.trim().length > 80) errors.name = 'Слишком длинное имя'

  const contact = form.contact.trim()
  if (!contact) errors.contact = 'Укажите номер телефона или Max'
  else if (!CONTACT_RE.test(contact)) errors.contact = 'Проверьте формат: @username или +7 900 123-45-67'

  if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) errors.email = 'Проверьте e-mail'

  if (!form.topic) errors.topic = 'Выберите направление'

  if (form.message.length > 1500) errors.message = 'Не больше 1500 символов'

  if (!form.consent) errors.consent = 'Нужно согласие на обработку данных'

  return errors
}

export function useOrderForm() {
  const form = reactive<OrderForm>(emptyForm())
  const errors = ref<Errors>({})
  const status = ref<OrderStatus>('idle')
  const statusMessage = ref('')

  const isSubmitting = computed(() => status.value === 'submitting')

  function reset() {
    Object.assign(form, emptyForm())
    errors.value = {}
    status.value = 'idle'
    statusMessage.value = ''
  }

  /** Снимает ошибку поля, как только пользователь его правит */
  function clearError(field: keyof OrderForm) {
    if (errors.value[field]) {
      const next = { ...errors.value }
      delete next[field]
      errors.value = next
    }
  }

  async function submit() {
    const found = validate(form)
    errors.value = found

    if (Object.keys(found).length) {
      status.value = 'error'
      statusMessage.value = 'Проверьте отмеченные поля'
      return false
    }

    status.value = 'submitting'
    statusMessage.value = ''

    try {
      await $fetch('/api/order', {
        method: 'POST',
        body: {
          name: form.name.trim(),
          contact: form.contact.trim(),
          email: form.email.trim() || undefined,
          topic: form.topic,
          budget: form.budget || undefined,
          message: form.message.trim() || undefined,
          website: form.website,
        },
      })

      status.value = 'success'
      statusMessage.value = 'Заявка принята'
      Object.assign(form, emptyForm())
      errors.value = {}
      return true
    } catch (error) {
      status.value = 'error'
      // h3 отдаёт текст в `data.message`, а не в `statusMessage`
      const failure = error as { data?: { message?: string }; message?: string }
      statusMessage.value =
        failure?.data?.message ??
        failure?.message ??
        'Не удалось отправить заявку. Напишите нам в Max или позвоните.'
      return false
    }
  }

  return { form, errors, status, statusMessage, isSubmitting, submit, reset, clearError }
}
