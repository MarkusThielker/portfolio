<script lang="ts">

    import PageTransition from "$lib/components/PageTransition.svelte"
    import type { PageData } from "./$types";

    /** @type {import("./$types").PageData} */
    export let data: PageData

</script>

<PageTransition>

    <h1>Legal Notice</h1>

    <h2>Information according to § 5 TMG</h2>
    <p>
        {data.legalNotice.name}<br>
        {data.legalNotice.street}<br>
        {data.legalNotice.zipCity}<br>
        {data.legalNotice.country}<br>
    </p>

    <h2>Contact information</h2>
    <p>
        Phone: {data.legalNotice.phone}<br>
        E-Mail: {data.legalNotice.email}<br>
    </p>

    <h2>Responsible for the content according to § 55 Abs. 2 RStV</h2>
    <p>
        {data.legalNotice.name}<br>
        {data.legalNotice.street}<br>
        {data.legalNotice.zipCity}<br>
        {data.legalNotice.country}<br>
    </p>

    <h2>Disclaimer</h2>

    <h3>Liability for contents</h3>
    <p>
        The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy,
        completeness and timeliness of the content. As a service provider, we are responsible for our own content on
        these pages in accordance with § 7 paragraph 1 TMG under the general laws. According to §§ 8 to 10 TMG, however,
        we are not obligated as a service provider to monitor transmitted or stored third-party information or to
        investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information
        under the general laws remain unaffected. However, liability in this regard is only possible from the point in
        time at which a concrete infringement of the law becomes known. If we become aware of any such infringements, we
        will remove the relevant content immediately.
    </p>

    <h3>Liability for links</h3>
    <p>
        Our offer contains links to external websites of third parties, on whose contents we have no influence.
        Therefore, we cannot assume any liability for these external contents. The respective provider or operator of
        the pages is always responsible for the content of the linked pages. The linked pages were checked for possible
        legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However,
        a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a
        violation of the law. If we become aware of any infringements, we will remove such links immediately.
    </p>

    <h3>Copyright</h3>
    <p>
        The contents and works created by the site operators on these pages are subject to German copyright law.
        Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the
        copyright law shall require the prior written consent of its respective author or creator. Downloads and copies
        of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not
        created by the operator, the copyrights of third parties are respected. In particular, third-party content is
        identified as such. Should you nevertheless become aware of a copyright infringement, please inform us
        accordingly. If we become aware of any infringements, we will remove such content immediately.
    </p>

</PageTransition>
