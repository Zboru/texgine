<template>
    <div>
        <nav>
            <ul>
                <li>texGine</li>
                <li>
                    <inertia-link href="/dashboard">Dashboard</inertia-link>
                </li>
                <li>
                    <inertia-link href="/browse">Browse</inertia-link>
                </li>
                <li>
                    <inertia-link href="/games">My Games</inertia-link>
                </li>
                <li class="flex-spacer"></li>
                <li>
                    <inertia-link href="/logout" method="post" as="button">Logout</inertia-link>
                </li>
            </ul>
        </nav>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Layout"
}
</script>

<style lang="scss" scoped>
nav {
    width: 100%;
    height: 70px;
    background: beige;
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
        width: 1180px;
        margin: 0;
        padding: 0;
        display: flex;
        list-style-type: none;

        li {
            padding: 20px 30px;
            border-left: 1px solid gray;
        }
    }
}
</style>
