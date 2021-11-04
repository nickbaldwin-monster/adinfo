

/*
 for login and logout, urls pass in several params

instance.logout({
    ...request,
    onRedirectNavigate: (url: any) => {
        console.log('onRedirectNavigate url:', url);
        // looks like https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=9deaf42c-a982-41a0-95bf-5d95fa66eb34&scope=openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fnnimmgedomeeljdbgghchnbgncnggdcc.chromiumapp.org%2F&client-request-id=e507ad5d-7561-4bc3-9059-2447033f33a2&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.16.1&x-client-OS=&x-client-CPU=&client_info=1&code_challenge=qjCn6OQ_rpcsENlJPHgxEDBYTD31IeufY3v1AA-V4e8&code_challenge_method=S256&nonce=d756423e-c16a-4bb2-9760-ca538efd3512&state=eyJpZCI6IjdiMmFkMGVhLWQxZDMtNDI3Ny1hYmE5LWZlYTRkNTgwM2Y1MCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D
        resolve(url);
        return false;
    }




that url is then passed into launchWebAuthFlow
and generates a responseURL that looks something like:
 https://nnimmgedomeeljdbgghchnbgncnggdcc.chromiumapp.org/#code=0.AUEAG1QpHXg-C0eHqN0xjPrv5yz06p2CqaBBlb9dlfpm6zQAAAA.AQABAAIAAAD--DLA3VO7QrddgJg7WevrejOcVrnyE-2__lCorKjFdfG-XD7Z-h2Y3LnpMwJUwxJHpMY3iAku031o5yBQqT536g2CTVMc4tWqFc2gBAVpqX4-x8IwJlkl8_93OLGUhIZyZmqJmaRZNx-Yj96-yfxKlLaGA6IT_e37g8iia9HpPgKh9iX57l4wXtrTHtdEagkaZYvhkN4c_or94_kDxInRsYt_Hdq9m_6FFJLsgld5TVJHmyJnCjAj6AzayvUbOjm63jpDH4eTfIjB1vFR_XjVQ_QFvqgzxNJ33Fhbc8JK2e0UyRO2Enlgbu90BkoexcqeR7wL_WRtqGHaLRhSgfS7r2oxIGRQBIsWnmUwo8fvfkPJXtt9SbpIRFnqsAv0sX2IjyRN25rc7hijtpgCYCiDmw3zlw4l2VcdkplVQA-n7fYJSugtAY_TTfWSBIZnu54Rn7Ygnu1qvPsodAOYhn1Y3NpUnZk8fMw6usV5YMDFIs2nkVSa4YMLHyTUBjY2ir3sa6FcG8h0ZtzqVxpDyIwPpHgfY5dLNnXJxJlyqO8mMqmLLlhMWVYgsgzkmhIKq5p_CxXMQ95MNHObdg0b1YLLHcHeiqrrJcM6y72iVWoAATTexmFHE7vp1xnYam2_1leNYHcw5LkaYm8slw6sqljWcV34V4iWlNgs7e59beIyP5LloezAezPeiU1FnErvFkwKkhJiiBu49JLGbH9nSWQJD0bTd8w6cnJmUulFgy7oS6rsYUwrmqmZlCsLUZO_F5HN3MEC_zfkzfWbKKWc725OIAA&client_info=eyJ1aWQiOiI3NzZkMDMxOC1kMDIzLTQ5YzUtYTc3Yy05OWQ4MmNjMzc0NDUiLCJ1dGlkIjoiMWQyOTU0MWItM2U3OC00NzBiLTg3YTgtZGQzMThjZmFlZmU3In0&state=eyJpZCI6IjdiMmFkMGVhLWQxZDMtNDI3Ny1hYmE5LWZlYTRkNTgwM2Y1MCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d&session_state=ce37c837-fba3-4e0e-bace-dee505ee42f6


 */
