<script setup lang="ts">
const site = useSite()
const { form, errors, status, statusMessage, isSubmitting, submit, clearError } = useOrderForm()

const topicLabels = Object.fromEntries(ORDER_TOPICS.map((item) => [item.value, item.label]))

const contacts = computed(() => [
  {
    icon: 'max',
    label: 'Max',
    value: site.contactPhone,
    href: site.contactMax,
    external: true,
  },
  {
    icon: 'mail',
    label: 'E-mail',
    value: site.contactEmail,
    href: SiteConfig.emailHref(site.contactEmail),
    external: false,
  },
])

const promises = [
  'Ответим в течение часа в рабочее время',
  'Зафиксируем объём и смету в договоре',
  'Репозиторий и доступы передаём вам',
]

defineProps<{ id?: string }>()

onMounted(() => {
  // Prefill по рекламной ссылке: /?topic=telegram-bot
  const topic = new URLSearchParams(window.location.search).get('topic')
  if (topic && topicLabels[topic]) form.topic = topic
})
</script>

<template>
  <section :id="id" class="relative">
    <div class="container-x">
      <div
        class="card relative overflow-hidden rounded-xl3 p-6 shadow-glow sm:p-10 lg:p-14"
        data-reveal
      >
        <!-- Фоновое свечение -->
        <div
          class="pointer-events-none absolute inset-0 -z-10"
          style="background: radial-gradient(80% 60% at 15% 0%, rgb(109 94 252 / 0.22), transparent 60%), radial-gradient(70% 60% at 100% 100%, rgb(6 182 212 / 0.18), transparent 60%)"
          aria-hidden="true"
        />

        <div class="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <!-- Левая колонка: заголовок и контакты -->
          <div>
            <p class="eyebrow">
              <span class="h-px w-8 bg-gradient-to-r from-aqua-400 to-transparent" />
              Заказ
            </p>

            <h2 class="mt-5 text-3xl leading-tight font-extrabold sm:text-4xl lg:text-[2.75rem]">
              Расскажите о задаче — <span class="text-gradient">ответим с планом работ</span>
            </h2>

            <p class="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              Опишите задачу в двух абзацах — этого достаточно, чтобы мы оценили объём,
              предложили архитектуру и обозначили сроки.
            </p>

            <ul class="mt-8 space-y-3">
              <li v-for="item in promises" :key="item" class="flex items-start gap-3 text-[15px] text-ink-soft">
                <Icon name="check" class="mt-0.5 size-4.5 shrink-0 text-mint-400" />
                {{ item }}
              </li>
            </ul>

            <!-- Контакты -->
            <div class="mt-10 space-y-2.5 border-t border-white/[0.08] pt-8">
              <a
                v-for="contact in contacts"
                :key="contact.label"
                :href="contact.href"
                :target="contact.external ? '_blank' : undefined"
                :rel="contact.external ? 'noopener' : undefined"
                class="group flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 transition-all duration-300 hover:border-aqua-400/40 hover:bg-white/[0.06]"
              >
                <span
                  class="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-aqua-300 transition-colors duration-300 group-hover:bg-aqua-400/15"
                >
                  <Icon :name="contact.icon" class="size-5" />
                </span>
                <span class="min-w-0">
                  <span class="block text-xs tracking-[0.12em] text-ink-mute uppercase">{{ contact.label }}</span>
                  <span class="block truncate font-display text-[15px] font-semibold text-ink">
                    {{ contact.value }}
                  </span>
                </span>
                <Icon
                  name="arrow-right"
                  class="ml-auto size-4 shrink-0 text-ink-mute transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <p class="flex items-center gap-2.5 px-1 pt-1.5 text-sm text-ink-mute">
                <Icon name="clock" class="size-4" />
                {{ site.workingHours }}
              </p>
            </div>
          </div>

          <!-- Форма -->
          <div class="relative">
            <!-- Состояние успеха -->
            <Transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 scale-95"
              leave-active-class="transition duration-200 ease-in"
              leave-to-class="opacity-0"
            >
              <div
                v-if="status === 'success'"
                class="flex h-full flex-col items-center justify-center rounded-xl2 border border-mint-400/30 bg-mint-400/[0.07] px-8 py-16 text-center"
                role="status"
              >
                <span class="inline-flex size-16 items-center justify-center rounded-full bg-mint-400/15 text-mint-400">
                  <Icon name="check" class="size-8" :stroke="2" />
                </span>
                <h3 class="mt-6 text-2xl font-bold">Заявка отправлена</h3>
                <p class="mt-3 max-w-sm text-ink-soft">
                  Спасибо! Мы получили сообщение и свяжемся в указанном мессенджере в течение часа
                  в рабочее время.
                </p>
                <button type="button" class="btn-ghost btn-sm mt-8" @click="status = 'idle'">
                  Отправить ещё одну
                </button>
              </div>
            </Transition>

            <form
              v-show="status !== 'success'"
              novalidate
              class="rounded-xl2 border border-white/[0.09] bg-white/[0.035] p-6 backdrop-blur-sm sm:p-8"
              @submit.prevent="submit"
            >
              <div class="grid gap-5 sm:grid-cols-2">
                <!-- Имя -->
                <div>
                  <label for="name" class="mb-2 block text-sm font-medium text-ink">Как вас зовут? *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    name="name"
                    autocomplete="name"
                    placeholder="Иван Петров"
                    class="field"
                    :class="{ 'field-error': errors.name }"
                    :aria-invalid="Boolean(errors.name)"
                    :aria-describedby="errors.name ? 'name-error' : undefined"
                    @input="clearError('name')"
                  >
                  <p v-if="errors.name" id="name-error" class="mt-2 text-xs text-rose-300">{{ errors.name }}</p>
                </div>

                <!-- Контакт -->
                <div>
                  <label for="contact" class="mb-2 block text-sm font-medium text-ink">Номер телефона или Max *</label>
                  <input
                    id="contact"
                    v-model="form.contact"
                    type="text"
                    name="contact"
                    autocomplete="tel"
                    placeholder="@username или +7 900 123-45-67"
                    class="field"
                    :class="{ 'field-error': errors.contact }"
                    :aria-invalid="Boolean(errors.contact)"
                    :aria-describedby="errors.contact ? 'contact-error' : undefined"
                    @input="clearError('contact')"
                  >
                  <p v-if="errors.contact" id="contact-error" class="mt-2 text-xs text-rose-300">
                    {{ errors.contact }}
                  </p>
                </div>

                <!-- E-mail -->
                <div class="sm:col-span-2">
                  <label for="email" class="mb-2 block text-sm font-medium text-ink">
                    E-mail <span class="text-ink-mute">(необязательно)</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="ivan@company.ru"
                    class="field"
                    :class="{ 'field-error': errors.email }"
                    :aria-invalid="Boolean(errors.email)"
                    :aria-describedby="errors.email ? 'email-error' : undefined"
                    @input="clearError('email')"
                  >
                  <p v-if="errors.email" id="email-error" class="mt-2 text-xs text-rose-300">{{ errors.email }}</p>
                </div>

                <!-- Направление -->
                <div>
                  <label for="topic" class="mb-2 block text-sm font-medium text-ink">Направление *</label>
                  <div class="relative">
                    <select
                      id="topic"
                      v-model="form.topic"
                      name="topic"
                      class="field appearance-none pr-10"
                      :class="{ 'field-error': errors.topic }"
                      :aria-invalid="Boolean(errors.topic)"
                      :aria-describedby="errors.topic ? 'topic-error' : undefined"
                      @change="clearError('topic')"
                    >
                      <option value="" disabled>Выберите вариант</option>
                      <option v-for="item in ORDER_TOPICS" :key="item.value" :value="item.value">
                        {{ item.label }}
                      </option>
                    </select>
                    <Icon
                      name="chevron-down"
                      class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-mute"
                    />
                  </div>
                  <p v-if="errors.topic" id="topic-error" class="mt-2 text-xs text-rose-300">{{ errors.topic }}</p>
                </div>

                <!-- Бюджет -->
                <div>
                  <label for="budget" class="mb-2 block text-sm font-medium text-ink">
                    Бюджет <span class="text-ink-mute">(необязательно)</span>
                  </label>
                  <div class="relative">
                    <select
                      id="budget"
                      v-model="form.budget"
                      name="budget"
                      class="field appearance-none pr-10"
                      @change="clearError('budget')"
                    >
                      <option v-for="item in ORDER_BUDGETS" :key="item.value" :value="item.value">
                        {{ item.label }}
                      </option>
                    </select>
                    <Icon
                      name="chevron-down"
                      class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-mute"
                    />
                  </div>
                </div>

                <!-- Сообщение -->
                <div class="sm:col-span-2">
                  <label for="message" class="mb-2 block text-sm font-medium text-ink">О задаче</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    name="message"
                    rows="4"
                    maxlength="1500"
                    placeholder="Что нужно сделать, сроки, ссылки на референсы…"
                    class="field resize-none"
                    :class="{ 'field-error': errors.message }"
                    :aria-invalid="Boolean(errors.message)"
                    :aria-describedby="errors.message ? 'message-error' : 'message-hint'"
                    @input="clearError('message')"
                  />
                  <div class="mt-2 flex items-start justify-between gap-4">
                    <p v-if="errors.message" id="message-error" class="text-xs text-rose-300">{{ errors.message }}</p>
                    <p v-else id="message-hint" class="text-xs text-ink-mute">
                      Чем подробнее описание, тем точнее первая оценка.
                    </p>
                    <span class="shrink-0 text-xs text-ink-mute">{{ form.message.length }}/1500</span>
                  </div>
                </div>
              </div>

              <!-- Honeypot: скрыт от людей, ловит ботов -->
              <div class="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label for="website">Не заполняйте это поле</label>
                <input id="website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
              </div>

              <!-- Согласие -->
              <label class="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
                <input
                  v-model="form.consent"
                  type="checkbox"
                  name="consent"
                  class="checkbox mt-0.5"
                  :class="{ 'field-error': errors.consent }"
                  :aria-invalid="Boolean(errors.consent)"
                  @change="clearError('consent')"
                >
                <span>
                  Согласен на обработку персональных данных
                  <span v-if="errors.consent" class="text-rose-300">— {{ errors.consent }}</span>
                </span>
              </label>

              <!-- Ошибка отправки -->
              <p
                v-if="status === 'error' && statusMessage"
                class="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-500/[0.08] px-4 py-3 text-sm text-rose-200"
                role="alert"
              >
                <Icon name="help-circle" class="mt-0.5 size-4.5 shrink-0" />
                {{ statusMessage }}
              </p>

              <button type="submit" class="btn-primary mt-7 w-full py-4 text-base" :disabled="isSubmitting">
                <template v-if="isSubmitting">
                  <span
                    class="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden="true"
                  />
                  Отправляем…
                </template>
                <template v-else>
                  Отправить заявку
                  <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </template>
              </button>

              <p class="mt-4 text-center text-xs text-ink-mute">
                Нажимая кнопку, вы соглашаетесь с
                <a href="#" class="link-underline">политикой обработки данных</a>. Это демо-форма: заявка
                сохраняется локально в логах сервера, отправка в Telegram/e-mail — см. <code>server/api/order.post.ts</code>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
