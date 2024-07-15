import { Box, Dialog, Divider, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AutoCompleteAddable from 'src/components/AutoCompleteAddable';
import { useDispatch } from 'src/redux/store';
import { useCreatePersonSkillMutation } from 'src/_requests/graphql/profile/skills/mutations/createPersonSkill.generated';
import { useCreateSkillMutation } from 'src/_requests/graphql/profile/skills/mutations/createSkill.generated';
import { useLazyGetSkillsQuery } from 'src/_requests/graphql/profile/skills/queries/getSkills.generated';

export default function SearchSkillDialog() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const [getSkills, { data: getSkillsData }] = useLazyGetSkillsQuery();
  const [createSkill] = useCreateSkillMutation();
  const [createPersonSkill] = useCreatePersonSkillMutation();

  // Query
  const handleChangeInputSearch = (val: string) => {
    // is typing status
    if (val) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
    // Query
    getSkills({
      filter: {
        dto: {
          title: val,
        },
      },
    });
  };

  // mutations!
  const handleChange = async (value: any & { inputValue?: string }) => {
    if (value.inputValue) {
      const resData: any = await createSkill({
        filter: {
          dto: {
            title: value.inputValue,
          },
        },
      });

      if (resData?.data?.createSkill?.isSuccess) {
        const newSkillId = resData?.data?.createSkill?.listDto?.items?.[0];

        createPersonSkill({
          filter: {
            dto: {
              skillId: newSkillId.id,
            },
          },
        });
        router.back();
      }
    } else {
      createPersonSkill({
        filter: {
          dto: {
            skillId: value.id,
          },
        },
      });
      router.back();
    }
  };

  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ minWidth: 600, minHeight: 320, py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Skill
            </Typography>
          </Box>
          <Link href="/profile/user" passHref>
            <IconButton>
              <CloseSquare />
            </IconButton>
          </Link>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <AutoCompleteAddable
            loading={false}
            onInputChange={(ev, val) => handleChangeInputSearch(val)}
            onChange={(ev, val) => handleChange(val)}
            options={getSkillsData?.getSkills?.listDto?.items || []}
            placeholder="Certificate Name"
          />
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              {!isTyping && (
                <Typography color="text.secondary" variant="body2">
                  Start typing to find your Company Name
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
}
