<script lang="ts">

    import {enhance} from "$app/forms"
    import {notifications} from "$lib/notification"

    /** @type {import("./$types").ActionData} */
    export let form
    $: {
        if (form) notifications.show(form.notification.type, form.notification.message)
    }

</script>

<div class="flex items-start justify-center">

    <div class="card flex flex-col max-w-md w-full space-y-4 ">

        <h1 class="text-xl text-center font-semibold">Admin Login</h1>

        <form class="flex flex-col space-y-2" method="POST" use:enhance>
            <div class="flex flex-col">
                <label for="username">Username</label>
                <input class="input-text" id="username" name="username" required/>
            </div>
            <div class="flex flex-col">
                <label for="password">Password</label>
                <input class="input-text" id="password" name="password" required type="password"/>
            </div>
            <input class="btn-primary" type="submit" value="Login"/>
        </form>
    </div>

</div>
