<template>
  <div id="page-home">
    <CoursesOverview v-if="!showInitialInformation" :groups="courseGroups"/>
    <InitialInformation v-else />
  </div>
</template>

<script>
import CoursesOverview from '../Layout/Course/CoursesOverview.vue'
import InitialInformation from '../Layout/Information/InitialInformation.vue'
import { groups } from '$root/__mocks__/courses.js'
import { namespace as userPreferencesNamespace, types as userPreferencesTypes } from '@/store/modules/persisted/UserPreferences.js'

export default {
    name: 'Home',
    pageTitleTranslationKey: 'App.pages.home',
    components: {
        CoursesOverview,
        InitialInformation
    },
    data() {
        return {
            courseGroups: groups.call(this, this.$t)
        }
    },
    computed: {
        showInitialInformation() {
            return this.$store.getters[userPreferencesNamespace + '/' + userPreferencesTypes.GET]('showInitialInformation')
        }
    }
}
</script>
